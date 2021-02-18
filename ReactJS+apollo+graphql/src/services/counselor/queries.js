import gql from "graphql-tag";

export const GET_COUNSELORS = gql`
    query($limit: Int = 20) {
        user(where: { user_type_id: { _eq: 2 } }, limit: $limit) {
            id
            school {
                name
            }
            enabled
        }
    }
`;

export const CREATE_COUNSELOR = gql`
    mutation($email: String!, $first_name: String!, $last_name: String!) {
        createCounselorUser(
            email: $email
            first_name: $first_name
            last_name: $last_name
        )
    }
`;

export const GET_EARNING_HISTORY = gql`
    query earningHistory(
        $counselorId: uuid
        $startDate: timestamptz
        $endDate: timestamptz
        $limit: Int = 10
    ) {
        earningHistory: shift(
            where: {
                shift_states: {
                    counselor_enrollment: {
                        counselor_id: { _eq: $counselorId }
                        backup: { _eq: false }
                        payout: { payout_status_id: { _in: [1, 2, 4] } }
                    }
                }
                start_date: { _gte: $startDate }
                end_date: { _lte: $endDate }
            }
            limit: $limit
            order_by: { start_date: desc }
        ) {
            start_date
            end_date
            shift_states {
                counselor_enrollment {
                    payout {
                        session {
                            start_date
                            end_date
                        }
                        amount
                    }
                }
            }
        }
    }
`;

export const GET_CURRENT_PERIOD_EARNINGS = gql`
    query GetCurrentPeriodEarnings(
        $startDate: String
        $endDate: String
        $timeZone: String
    ) {
        currentPeriod: getEarnedAmountInPeriod(
            startDate: $startDate
            endDate: $endDate
            timeZone: $timeZone
        ) {
            amount
            hoursWorked: duration
        }
    }
`;

export const GET_CURRENT_PERIOD_EARNINGS_FOR_COUNSELOR = gql`
    query GetCurrentPeriodEarnings(
        $counselorId: String
        $startDate: String
        $endDate: String
        $timeZone: String
    ) {
        currentPeriod: getEarnedAmountInPeriod(
            counselorId: $counselorId
            startDate: $startDate
            endDate: $endDate
            timeZone: $timeZone
        ) {
            amount
            hoursWorked: duration
        }
    }
`;

export const GET_EARNINGS = gql`
    query payoutHistory(
        $counselorId: uuid
        $startDate: timestamptz
        $endDate: timestamptz
        $limit: Int = 10
    ) {
        allTime: payout_aggregate(
            where: {
                payout_status_id: { _in: [1, 2, 3] }
                _or: [
                    {
                        counselor_enrollment: {
                            counselor_id: { _eq: $counselorId }
                        }
                    }
                    {
                        session: {
                            counselor_enrollment: {
                                counselor_id: { _eq: $counselorId }
                            }
                        }
                    }
                ]
            }
        ) {
            aggregate {
                sum {
                    amount
                }
            }
        }
        allTimeSessions: session_aggregate(
            where: {
                # ended sessions
                session_status_id: { _in: [3] }
                counselor_id: { _eq: $counselorId }
            }
        ) {
            aggregate {
                count
            }
        }
        sessions: session_aggregate(
            where: {
                # ended sessions
                session_status_id: { _in: [3] }
                start_date: { _gte: $startDate, _lte: $endDate }
                counselor_id: { _eq: $counselorId }
            }
        ) {
            aggregate {
                count
            }
        }

        shifts: shift(
            where: {
                start_date: { _gte: $startDate, _lte: $endDate }
                shift_states: {
                    counselor_enrollment: {
                        counselor_id: { _eq: $counselorId }
                    }
                }
            }
        ) {
            start_date
            end_date
        }

        nextPayout: payout_aggregate(
            where: {
                date: { _gte: $startDate, _lte: $endDate }
                payout_status_id: { _in: [1, 2] }
                _or: [
                    {
                        counselor_enrollment: {
                            counselor_id: { _eq: $counselorId }
                        }
                    }
                    {
                        session: {
                            counselor_enrollment: {
                                counselor_id: { _eq: $counselorId }
                            }
                        }
                    }
                ]
            }
        ) {
            aggregate {
                sum {
                    amount
                }
            }
        }
        totalEarningHistory: shift_aggregate(
            where: {
                shift_states: {
                    counselor_enrollment: {
                        counselor_id: { _eq: $counselorId }
                        backup: { _eq: false }
                        payout: { payout_status_id: { _in: [1, 2, 3] } }
                    }
                }
                start_date: { _gte: $startDate }
                end_date: { _lte: $endDate }
            }
        ) {
            aggregate {
                count
            }
        }
        earningHistory: shift(
            where: {
                shift_states: {
                    counselor_enrollment: {
                        counselor_id: { _eq: $counselorId }
                        backup: { _eq: false }
                        payout: { payout_status_id: { _in: [1, 2, 3] } }
                    }
                }
                start_date: { _gte: $startDate }
                end_date: { _lte: $endDate }
            }
            limit: $limit
            order_by: { start_date: desc }
        ) {
            start_date
            end_date
            shift_states {
                counselor_enrollment {
                    payout {
                        session {
                            start_date
                            end_date
                        }
                        amount
                    }
                }
            }
        }
    }
`;

export const GET_TRUE_VAULT_TOKEN = gql`
    query {
        getTruevaultUserAccessToken
    }
`;
export const VALIDATE_CODE = gql`
    query validateCode($code: String!) {
        validateCode(code: $code)
    }
`;
export const GET_USER = gql`
    query GetUser($userId: uuid!) {
        user(where: { id: { _eq: $userId } }) {
            id
            user_type_id
        }
    }
`;

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
        counselorOnboard(password: $password, phone_number: $phoneNumber)
    }
`;

export const CHANGE_ENABLE_STATUS = gql`
    mutation($counselorId: uuid!, $enabled: Boolean!) {
        update_user(
            where: { id: { _eq: $counselorId } }
            _set: { enabled: $enabled }
        ) {
            returning {
                enabled
            }
        }
    }
`;

export const UPLOAD_AVATAR = gql`
    mutation($file: String!) {
        uploadAvatar(file: $file)
    }
`;

export const GET_REVIEWS_FOR_COUNSELOR = gql`
    query GetReiewsForCounselor(
        $counselorId: uuid
        $lastId: Int = null
        $limit: Int = 10
    ) {
        total_positive: session_feedback_aggregate(
            where: {
                helpful: { _eq: true }
                session: { counselor_id: { _eq: $counselorId } }
            }
        ) {
            aggregate {
                positive: count
            }
        }

        total_feedback: session_feedback_aggregate(
            where: { session: { counselor_id: { _eq: $counselorId } } }
        ) {
            aggregate {
                total: count
            }
        }
        session_feedback(
            limit: $limit
            order_by: [{ id: desc }]
            where: {
                id: { _lt: $lastId }
                session: { counselor_id: { _eq: $counselorId } }
            }
        ) {
            id
            helpful
            comment

            session {
                scheduled_start_date
            }
        }
    }
`;
