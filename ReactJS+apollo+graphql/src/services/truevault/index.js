import { apollo, createInstance } from "../external.service";
import { logger, storage, toCamel, toSnake } from "../../helpers";
import * as _ from "lodash";
import * as validators from "./validators";
import { CONSTANT } from "../../constants";
import * as QUERIES from "../counselor/queries";
import BPromise from "bluebird";

const api = createInstance(
    {
        baseURL: process.env.REACT_APP_TRUEVAULT_BASE_URL,
    },
    {
        auth: () => {
            const token = storage(CONSTANT.STORAGE.TRUE_VAULT_TOKEN);
            if (token) {
                return `Basic ${token}`;
            }
        },
    }
);

const RESULT_SUCCESS = "success";

const login = async (username, password) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("account_id", process.env.REACT_APP_TRUEVAULT_ACCOUNT_ID);
    return api
        .post("/v1/auth/login", data)
        .then((response) => {
            const { result, user } = response.data;
            if (result !== RESULT_SUCCESS) {
                throw new Error("Login Error");
            }
            logger.debug("TrueVault.login", {
                username: user.username,
            });

            return {
                user: {
                    id: user.id,
                    username: user.username,
                },
                token: btoa(`${user.access_token}:`),
                idp: "admin",
            };
        })
        .catch((error) => {
            logger.error("TrueVault.login", { error });
        });
};

const get = (ids, uri, resultsField, subField, requestConfig) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }

    const map = (result) =>
        toCamel({
            ...(subField ? result[subField] : result),
            id: result.id,
        });
    return api.get(`${uri}${ids.join(",")}`, requestConfig).then((response) => {
        let results = response.data[resultsField];

        return Array.isArray(results) ? results.map(map) : map(results);
    });
};
const listDocuments = (ids, vaultId) => {
    return get(
        ids,
        `/v2/vaults/${vaultId}/documents/`,

        "documents",
        "document"
    );
};
const toBase64 = (data) => btoa(JSON.stringify(data));
const fromBase64 = (data) => JSON.parse(atob(data));
const update = (data, uri, field, converter = toSnake) => {
    return api.put(uri, {
        [field]: converter(data),
    });
};

const updateDocument = (id, data, vaultId, validator = (data) => data) => {
    data = validator(data);
    return update(
        data,
        `/v2/vaults/${vaultId}/documents/${id}`,
        "document"
    ).then((response) => {
        const { result } = response.data;
        return result === "success" ? toCamel(data) : null;
    });
};

const createDocumentService = (vaultId, validator) => {
    return {
        get: (id) => {
            return listDocuments(id, vaultId).then((docs) => docs[0]);
        },
        /**
         * @function list
         * @param {string[]}  ids
         * @returns Promise<T>
         */
        list: _.partialRight(listDocuments, vaultId),
        /**
         * @function
         * @param {string} id
         * @param {object} data
         */
        update: _.partialRight(updateDocument, vaultId, validator),
    };
};
const updateUser = async (id, data, fetch = false) => {
    let previous = {};
    if (fetch) {
        const users = await getUsers(id);

        if (!users.length) {
            throw new Error("not_found");
        }
        previous = users[0];
    }
    const attributes = validators.userValidator({
        ...previous,
        ...data,
    });

    const formData = new FormData();
    formData.append("attributes", toBase64(attributes));
    return api.put(`/v1/users/${id}`, formData).then((response) => {
        const { result } = response.data;
        if (result === "success") {
            return prepUser(toCamel(attributes));
        }
    });
};
const prepUser = (user) => {
    if (_.isString(user.attributes)) {
        user.attributes = prepUser(toCamel(fromBase64(user.attributes)));
    } else {
        user.name = `${user.firstName} ${user.lastName}`;
        user.reverseName = `${user.lastName} ${user.firstName}`;
    }
    return user;
};

/**
 *
 * @param {string|string[]} ids
 * @returns {Promise<CounslrUser>}
 */
const getUsers = (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return get(
        [],
        `/v2/users/${ids.join(",")}?full=true`,
        "users",
        "attributes"
    ).then((users) => {
        return users.map(prepUser);
    });
};
/**
 * @typedef TrueVaultUser
 * @property {string} id
 * @property {object|CounslrUser} attributes
 * @property {string} nickname
 *
 */
/**
 *
 * @param authToken
 * @returns {Promise<TrueVaultUser>}
 */
const me = (authToken) => {
    const requestConfig = {};
    if (authToken) {
        requestConfig.headers = {
            Authorization: `Basic ${authToken}`,
        };
    }
    return get([], "/v1/auth/me?full=true", "user", null, requestConfig).then(
        prepUser
    );
};

const profileVaultId = _.partial(storage, "profile_vault_id");
const documentVaultId = _.partial(storage, "document_vault_id");
/**
 *
 * @param {object<{ref:File,name:string,id:string}>} file
 * @param counselorId
 * @param profileVaultId
 * @returns {Promise<void>}
 */
const upload = async (file, counselorId, profileVaultId) => {
    const formData = new FormData();
    formData.append("file", file.ref);
    if (file.name) {
        formData.append("filename", file.name);
    }
    formData.append("owner_id", counselorId);
    const method = file.id ? "put" : "post";

    return api[method](
        `/v1/vaults/${profileVaultId}/blobs${file.id ? `/${file.id}` : ""}`,
        formData,
        {
            headers: {
                "content-type": "multipart/form-data",
            },
        }
    )
        .then((response) => {
            const {
                data: { result, blob_id },
            } = response;
            if (result === "success") {
                return blob_id;
            }
            return false;
        })
        .catch((error) => {
            throw new Error("Unable to upload");
        });
};

const newToken = async () => {
    const {
        data: { getTruevaultUserAccessToken: token },
    } = await apollo.query({
        query: QUERIES.GET_TRUE_VAULT_TOKEN,
        context: {
            useHasuraUserId: true,
        },
    });
    return token;
};
const blobContents = async (vaultId, blobId) =>
    api.get(`/v1/vaults/${vaultId}/blobs/${blobId}`, {
        responseType: "arraybuffer",
    });

const image = async (vaultId, blobId, fileName) => {
    return blobContents(vaultId, blobId).then((response) =>
        window.URL.createObjectURL(new File([response.data], fileName))
    );
};

const loadUsers = async (ids, documentType) => {
    const isStudent = documentType === "students";
    let users = isStudent
        ? ids.map((profileDocumentId) => ({ profileDocumentId }))
        : await getUsers(ids);

    let documents = await trueVaultService.documents[documentType].list(
        _.map(users, "profileDocumentId")
    );
    if (isStudent) {
        documents = await BPromise.map(documents, async (user) => {
            if (!user.avatarUrl && user.avatarBlobId) {
                user.avatarUrl = await image(
                    user.profileVaultId ||
                        process.env.REACT_APP_TRUEVAULT_STUDENT_VAULT_ID,
                    user.avatarBlobId,
                    `${user.id}_avatar.png`
                );
            }
            return user;
        });
    }

    const documentsById = _.keyBy(documents, "id");
    return users.map((user) => {
        return {
            ...documentsById[user.profileDocumentId], //  add first so that the `id` is overwritten with the user.id
            ...user,
        };
    });
};
/**
 *
 * @param profileDocumentIds
 * @return {Promise<Student>}
 */
const studentsByDocumentId = async (profileDocumentIds) =>
    (await loadUsers(profileDocumentIds, "students")).map(prepUser);
const counselors = async (ids) => loadUsers(ids, "counselors");

export const trueVaultService = {
    login,
    me,
    image,
    blobContents,
    newToken,
    upload,
    users: {
        update: updateUser,
        get: (id) => getUsers(id).then((users) => users[0]),
        list: getUsers,
        studentsByDocumentId,
        counselors,
    },
    isAdmin: () => {
        return !profileVaultId() || documentVaultId();
    },
    ids: {
        profileVaultId,
        documentVaultId,
    },
    documents: {
        notes: createDocumentService(
            process.env.REACT_APP_TRUEVAULT_NOTES_VAULT_ID,
            validators.notesDocumentValidator
        ),
        counselors: createDocumentService(
            process.env.REACT_APP_TRUEVAULT_COUNSELOR_VAULT_ID,
            validators.counselorDocumentValidator
        ),
        students: createDocumentService(
            process.env.REACT_APP_TRUEVAULT_STUDENT_VAULT_ID
        ),
    },
};
