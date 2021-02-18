import gql from "graphql-tag";

export const FORGOT_PASSWORD = gql`
    mutation($email: String!) {
        forgotPassword(email: $email)
    }
`;

export const UPDATE_PASSWORD = gql`
    mutation($password: String!) {
        updatePassword(password: $password)
    }
`;
export const CONTINUE_ONBOARDING = gql`
    mutation($password: String!, $phoneNumber: String!) {
        continueOnboarding(password: $password, phone_number: $phoneNumber)
    }
`;

export const VALIDATE_TFA = gql`
    mutation($code: String!) {
        verifyTFA(code: $code)
    }
`;
export const INITIATE_TFA = gql`
    mutation($phoneNumber: String) {
        initiateTFA(phone_number: $phoneNumber)
    }
`;
export const ME = gql`
    query {
        me {
            userTypeId
            idp
            stripe
            truevault
            onBoardingCompleted
        }
    }
`;

export const LOGIN = gql`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userTypeId
            idp
            stripe
            phoneNumber
            onBoardingCompleted
        }
    }
`;

export const SAVE_PAYMENT_INFO = gql`
    mutation savePaymentInformation($authorizationToken: String!) {
        savePaymentInformation(authorizationToken: $authorizationToken)
    }
`;
