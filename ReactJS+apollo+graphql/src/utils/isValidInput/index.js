export const isValidInput = (
    field,
    validator,
    isSubmit,
    errorType = "err-input"
) => {
    if (isSubmit && !validator.fields[field]) {
        return errorType;
    } else {
        return "";
    }
};
