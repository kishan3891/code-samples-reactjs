import gql from "graphql-tag";

export const LIST_SCHEDULE = gql`
    query shifts(
        $startDate: timestamptz
        $endDate: timestamptz
        $stateId: Int
    ) {
        shift(
            where: {
                _and: [
                    { start_date: { _gte: $startDate } }
                    { end_date: { _lt: $endDate } }
                ]
                shift_states: { state_id: { _eq: $stateId } }
            }
            order_by: { start_date: asc }
        ) {
            id
            start_date
            end_date
            shift_states {
                id
                capacity
                counselor_enrollment {
                    counselor_id
                    id
                    backup
                    shift_states_id
                    students_enrollment_aggregate {
                        aggregate {
                            count
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_SHIFT = gql`
    mutation($startDate: String!, $endDate: String!, $capacity: Int!) {
        createShift(
            endDate: $endDate
            startDate: $startDate
            capacity: $capacity
        )
    }
`;
export const DELETE_SHIFT = gql`
    mutation($shiftId: Int!) {
        deleteShift(shiftId: $shiftId)
    }
`;
export const COPY_SHIFTS = gql`
    mutation($fromDate: String!, $toDate: String!, $timeZone: String!) {
        copyShifts(fromDate: $fromDate, toDate: $toDate, timeZone: $timeZone) {
            ids
            copyErrors {
                code
                message
                shift {
                    startDate
                    endDate
                    capacity
                }
            }
        }
    }
`;
export const GET_SHIFT_ADMIN = gql`
    query($shiftIds: [Int!]!) {
        shifts: shift(where: { id: { _in: $shiftIds } }) {
            id
            start_date
            end_date
            shift_states {
                id
                capacity
                counselor_enrollment {
                    counselor_id
                    id
                }
            }
        }
    }
`;

export const GET_SHIFT_COUNSELOR = gql`
    query GetShiftDeatilsForCounselor($id: Int!) {
        shift_by_pk(id: $id) {
            id
            start_date
            end_date
            shift_states {
                capacity
                counselor_enrollment {
                    enrollment_id: id
                    students_enrollment {
                        session {
                            id
                            scheduled_end_date
                            scheduled_start_date
                            note_document_id
                            session_type_id
                            student {
                                id
                                profile_document_id
                                school {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const JOIN_SHIFT = gql`
    mutation joinShift(
        $shiftStatesId: Int!
        $counselorId: String
        $timeZone: String
    ) {
        insertCounselorEnrollment(
            shiftStatesId: $shiftStatesId
            counselorId: $counselorId
            timeZone: $timeZone
        )
    }
`;

export const LEAVE_SHIFT = gql`
    mutation leaveShift($counselorEnrollmentId: Int!) {
        leaveShift(counselorEnrollmentId: $counselorEnrollmentId) {
            id
            counselor_id
            backup
            shift_states_id
            start_date: shift_start_date
            end_date: shift_end_date
        }
    }
`;
export const AVAILABLE_SHIFTS = gql`
    query availableShifts(
        $counselorId: String!
        $stateId: Int!
        $startDate: String!
        $endDate: String
    ) {
        availableShifts(
            userId: $counselorId
            stateId: $stateId
            from: $startDate
            to: $endDate
        ) {
            id
            _id: id
            shift_states_id
            start: start_date
            end: end_date
            capacity
            count
            backups
            counselor_enrollment {
                id
                backup
                students
            }
        }
    }
`;

export const EXTRA_COUNSELOR_DETAILS = gql`
    query GetCounselorDetailsFormShift($counselorIds: [uuid!]!) {
        user(where: { id: { _in: $counselorIds } }) {
            id
            enabled
            school {
                name
            }
        }
    }
`;

export const COUNSELOR_ENROLLMENT = gql`
    query($id: Int!) {
        counselor_enrollment_by_pk(id: $id) {
            id
            backup
            shift_states_id
            students_enrollment_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const GET_SCHEDULE_FOR_COUNSELOR = gql`
    query GetScheduleForCounselor(
        $counselorId: uuid
        $startDate: timestamptz
        $endDate: timestamptz
    ) {
        shift(
            where: {
                start_date: { _gte: $startDate }
                end_date: { _lte: $endDate }
                shift_states: {
                    counselor_enrollment: {
                        counselor_id: { _eq: $counselorId }
                    }
                }
            }
            order_by: { start_date: asc }
        ) {
            id
            start_date
            end_date
            shift_states {
                counselor_enrollment(
                    where: { counselor_id: { _eq: $counselorId } }
                ) {
                    id
                    backup
                    shift_states_id
                    students_enrollment_aggregate {
                        aggregate {
                            count
                        }
                    }
                }
            }
        }
    }
`;

export const UPDATE_SHIFT_CAPACITY = gql`
    mutation UpdateShiftCapacity(
        $shiftId: Int!
        $capacity: Int!
        $stateId: Int
    ) {
        updateShiftCapacity(
            shiftId: $shiftId
            capacity: $capacity
            stateId: $stateId
        )
    }
`;
