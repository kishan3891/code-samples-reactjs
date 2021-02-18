import { schoolsConstants } from "../constants";
import { schoolService } from "../services";
import { alertActions } from "./";
import { createActionThunk } from "../constants/actionTypes";

const listSchools = createActionThunk(schoolsConstants.GET_ALL, async () => {
    const schools = await schoolService.listSchools();
    return { schools };
});

/**
 * @function add
 * @param {School} data
 * @returns {Promise<{School:SchoolUser}>}
 */
const addSchool = createActionThunk(
    schoolsConstants.ADD_SCHOOL,
    async (data, { dispatch }) => {
        const school = await schoolService.create(data);
        dispatch(alertActions.success("School added successfully"));

        return { school };
    }
);

/**
 *
 * @function updateSchool
 * @param {string} id
 * @param {school} data
 * @returns {Promise<{school:school}>}
 */
const updateSchool = createActionThunk(
    schoolsConstants.UPDATE_SCHOOL,
    async (id, data, { dispatch }) => {
        const school = await schoolService.update(id, data);
        dispatch(alertActions.success("School updated successfully"));

        return { school: school };
    }
);

const changeEnableStatus = createActionThunk(
    schoolsConstants.CHANGE_ENABLE_STATUS,
    async (schoolId, enabled) => {
        enabled = await schoolService.changeEnableStatus(schoolId, enabled);
        return { schoolId, enabled };
    }
);

export const schoolActions = {
    updateSchool,
    listSchools,
    addSchool,
    changeEnableStatus,
};
