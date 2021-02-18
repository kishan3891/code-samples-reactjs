export const showMessage = (validator, field) => {
    let messages = validator.getErrorMessages();

    if (typeof messages != "undefined" && messages[field] != null) {
        let message = messages[field];
        const ret = message.replace(field, "");
        if (ret === "The  field is required.") {
            return null;
        } else if (ret === "The  may only contain letters and numbers.") {
            return "Incorrect format";
        } else if (ret === "The  must be a valid email address.") {
            return "Please enter valid email";
        } else {
            return message;
        }
    }
    return "";
};
