import gql from "graphql-tag";

export const GET_PAST_SESSION_NOTES_IDS = gql`
    query($studentId: String!) {
        getPastNotesDocumentIds(studentId: $studentId) {
            session_id
            date
            note_document_id
        }
    }
`;

export const GET_FEEDBACK = gql`
    query($counselorId: uuid!, $limit: Int = 10, $last: Int = 0) {
        session(
            where: { counselor_id: { _eq: $counselorId }, id: { _gte: $last } }
            limit: $limit
        ) {
            scheduled_start_date
            session_feedback {
                helpful
                comment
            }
        }
        total_helpful: session_feedback_aggregate(
            where: {
                session: { counselor_id: { _eq: $counselorId } }
                helpful: { _eq: true }
            }
        ) {
            aggregate {
                count
            }
        }
        total: session_feedback_aggregate(
            where: { session: { counselor_id: { _eq: $counselorId } } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

export const SESSIONS_FOR_DAY = gql`
    query SessionsForDay(
        $counselorId: uuid!
        $startDate: timestamptz!
        $endDate: timestamptz!
    ) {
        sessions: session(
            where: {
                counselor_id: { _eq: $counselorId }
                # confirmed or started
                session_status_id: { _in: [1, 2] }
                _or: [
                    {
                        scheduled_start_date: { _lte: $startDate }
                        scheduled_end_date: { _gte: $startDate }
                    }
                    {
                        scheduled_start_date: { _lte: $endDate }
                        scheduled_end_date: { _gte: $endDate }
                    }
                    {
                        scheduled_start_date: { _gte: $startDate }
                        scheduled_end_date: { _lte: $endDate }
                    }
                ]
            }
        ) {
            id
            scheduled_start_date
            scheduled_end_date
            start_date
            end_date
            note_document_id
            session_status_id
            session_type_id
            session_status {
                value
            }
            chat_channel_id
            student {
                id
                profile_document_id
                school {
                    name
                }
            }
        }
    }
`;

export const SUBSCRIBE_SESSIONS_FOR_DAY = gql`
    subscription SessionsForDay(
        $counselorId: uuid!
        $startDate: timestamptz!
        $endDate: timestamptz!
    ) {
        sessions: session(
            where: {
                counselor_id: { _eq: $counselorId }
                # confirmed or started

                _or: [
                    {
                        session_status_id: { _in: [1, 2] }
                        scheduled_start_date: { _lte: $startDate }
                        scheduled_end_date: { _gte: $startDate }
                    }
                    {
                        session_status_id: { _in: [1, 2] }
                        scheduled_start_date: { _lte: $endDate }
                        scheduled_end_date: { _gte: $endDate }
                    }
                    {
                        session_status_id: { _in: [1, 2] }
                        scheduled_start_date: { _gte: $startDate }
                        scheduled_end_date: { _lte: $endDate }
                    }
                    {
                        session_status_id: { _eq: 3 }
                        cleanup_session: { _eq: true }
                        is_counselor_notes_submitted: { _eq: false }
                    }
                ]
            }
        ) {
            id
            scheduled_start_date
            scheduled_end_date
            start_date
            end_date
            note_document_id
            session_status_id
            session_type_id
            session_status {
                value
            }
            chat_channel_id
            student {
                id
                profile_document_id
                school {
                    name
                    emergency_services {
                        name
                        phone
                    }
                }
            }
            is_counselor_notes_submitted
        }
    }
`;

export const GET_SESSION_BY_ID = gql`
    query GetSessionById($sessionId: Int!) {
        session: session_by_pk(id: $sessionId) {
            id
            scheduled_start_date
            scheduled_end_date
            start_date
            end_date
            note_document_id
            session_status_id
            session_type_id
            session_status {
                value
            }
            chat_channel_id
            student {
                id
                profile_document_id
                school {
                    name
                }
            }
            is_counselor_notes_submitted
        }
    }
`;
export const CHANGE_SESSION_STATUS = gql`
    mutation ChangeSessionStatus($sessionId: Int!, $statusId: Int!) {
        changeSessionStatus(sessionId: $sessionId, statusId: $statusId)
    }
`;
export const MARK_SESSION_NOTES_SUBMITTED = gql`
    mutation MarkSessionNotesSubmitted($sessionId: Int!) {
        update_session(
            where: { id: { _eq: $sessionId } }
            _set: { is_counselor_notes_submitted: true }
        ) {
            affected_rows
        }
    }
`;
