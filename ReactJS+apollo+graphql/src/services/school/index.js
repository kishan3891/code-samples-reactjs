import * as QUERIES from "./queries";
import { apollo } from "../external.service";
import * as _ from "lodash";
import { toFileBase64 } from "../../helpers";

const prepSchoolInput = (data) => {
    const emergency_services = (data?.emergency_services || []).map((s) =>
        _.pick(s, ["id", "name", "phone", "delete"])
    );
    return _.pickBy(
        _.pick(
            {
                ...data,
                emergency_services,
            },
            [
                "id",
                "address",
                "file",
                "name",
                "phone",
                "resources",
                "enabled",
                "plan_id",
                "more_resources_link",
                "emergency_services",
            ]
        ),
        (value, key) => {
            if (_.isString(value)) return !_.isEmpty(value);

            return typeof value !== "undefined" && value !== null;
        }
    );
};
/**
 *
 *
 * @param page
 * @param limit
 */

/**
 * @typedef {object} State
 * @property {string} id
 * @property {string} value
 * @property {string} abbreviation
 */
/**
 * @typedef {object} Plan
 * @property {number} id
 * @property {number} frequency
 * @property {string} name
 * @property {number} sessions_count
 */
/**
 * @typedef School
 * @property {string} id
 * @property {string} logo
 * @property {string} name
 * @property {string} address
 * @property {string} state_id
 * @property {string} resources
 * @property {State} state
 * @property {Plan} plan
 */
const listSchools = async (page = 1, limit = 50) => {
    const {
        data: { school },
    } = await apollo.query({
        query: QUERIES.GET_SCHOOLS,
        variables: { /*page: 1, */ limit: 50 },
    });

    return school;
};

/**
 * Creates a new School
 * @param {School} data
 * @returns {Promise<{school: School}>}
 */

const create = async (data) => {
    return createOrUpdateSchool(data);
};

/**
 *  Updates a school profile
 * @param {string} id
 * @param {School} data
 * @returns {Promise<{school: school}>}
 */
const update = async (id, data) => {
    return createOrUpdateSchool({ id, ...data });
};

const createOrUpdateSchool = async (data) => {
    const input = prepSchoolInput(data);
    if (input.file) {
        input.file = await toFileBase64(input.file);
    }
    const {
        data: { createOrUpdateSchool: school },
    } = await apollo.mutate({
        mutation: QUERIES.CREATE_OR_UPDATE_SCHOOL,
        variables: {
            input,
        },
        fetchPolicy: "no-cache",
    });
    return school;
};
const changeEnableStatus = async (schoolId, enabled) => {
    const {
        data: {
            update_school: { returning },
        },
    } = await apollo.mutate({
        mutation: QUERIES.CHANGE_ENABLE_STATUS,
        variables: {
            schoolId,
            enabled,
        },
    });
    return returning[0].enabled;
};
export const schoolService = {
    QUERIES,
    listSchools,
    create,
    update,
    changeEnableStatus,
};
