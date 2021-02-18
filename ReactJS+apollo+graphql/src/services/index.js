import gql from "graphql-tag";
import { apollo } from "./external.service";
import { CONFIG_CACHE } from "./cache.service";

export * from "./user";
export * from "./counselor";
export * from "./school";
export * from "./plan";
export * from "./schedule";
//export * from "./counslr.schedule.service";
export * from "./session";
export * from "./truevault";

const BOOT_UP = gql`
    query {
        config {
            maxShiftCapacity: counselor_shift_capacity
            minShiftHoursDuration: min_shift_duration_hours
            maxShiftHoursDuration: max_shift_duration_hours
            maxBackupsPerShift: max_backups_per_shift
            notesSubmitHoursThreshold: notes_submit_hours_threshold
        }

        notesConfig: counselor_note_config(order_by: { order: asc }) {
            id
            title
            maxLength: max_length
            type
            key
            options: custom_notes_options {
                id
                value
            }
        }

        sexuality {
            id
            value
        }
        gender {
            id
            value
        }
        ethnicity {
            id
            value
        }
    }
`;

/**
 * @typedef {object} IdValue
 * @property {number} id
 * @property {string} value
 */

/**
 * @typedef {IdValue} Sexuality
 */
/**
 * @typedef {IdValue} Gender
 */
/**
 * @typedef {IdValue} Ethnicity
 */

/**
 * @typedef {IdValue} NotesConfigOption
 */
/**
 * @typedef {object} NotesConfig
 * @property {number} id
 * @property {string} title
 * @property {number} maxLength
 * @property {string} type (`input` or `check` if `check` `options` will be populated)
 * @property {string} key
 * @property {NotesConfigOption[]} options
 */
/**
 * @typedef {object} CounslrConfig
 * @property {number} maxShiftCapacity
 * @property {number} minShiftHoursDuration
 * @property {number} maxShiftHoursDuration
 * @property {number} maxBackupsPerShift
 * @property {number} notesSubmitHoursThreshold
 */
/**
 * @typedef CounslrSettings
 * @property {Sexuality[]} sexuality
 * @property {Gender[]} gender
 * @property {Ethnicity[]} ethnicity
 * @property {NotesConfig[]} notesConfig
 *
 *
 */

/**
 * Fetch counslr settings
 * @return {Promise<{CounslrSettings}>}
 */
export const fetchSettings = async () => {
    const {
        data: {
            config: [config],
            notesConfig,
            sexuality,
            gender,
            ethnicity,
        },
    } = await apollo.query({
        query: BOOT_UP,
    });
    CONFIG_CACHE.GENDER = gender;
    return { config, sexuality, gender, ethnicity, notesConfig };
};
