import { toSnake } from "../../helpers";
import * as _ from "lodash";

const baseValidator = (fields, object) => {
    return _.pickBy(_.pick(toSnake(object), fields), (value) => {
        if (_.isString(value)) return !_.isEmpty(value);
        return typeof value !== "undefined" && value !== null;
    });
};

export const userValidator = _.partial(baseValidator, [
    "last_name",
    "first_name",
    "email",
    "phone_number",
    "profile_vault_id",
    "profile_document_id",
    "avatar_blob_id",
    "send_bird_user_id",
    "temp_phone_number",
]);

export const counselorDocumentValidator = _.partial(baseValidator, [
    "bio",
    "date_of_birth",
    "ethnicity_id",
    "gender_id",
    "insurance_expiration_date",
    "insurance_number",
    "license_expiration_date",
    "license_number",
    "license_state",
    "nickname",
    "first_name",
    "last_name",
    "sexuality_id",
    "avatar_url",
    "send_bird_user_id",
]);

export const notesDocumentValidator = _.partial(baseValidator, [
    "reasons",
    "symptoms",
    "questions",
    "concerns",
    "saved",
    "next_steps",
]);
