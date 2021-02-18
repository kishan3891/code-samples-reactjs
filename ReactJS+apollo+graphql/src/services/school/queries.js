import gql from "graphql-tag";

export const GET_SCHOOLS = gql`
    query($limit: Int = 20) {
        school(limit: $limit) {
            id
            address
            issuer
            logo
            name
            phone
            resources
            more_resources_link
            emergency_services {
                id
                name
                phone
            }
            plan {
                frequency
                id
                name
                sessions_count
            }
            state {
                id
                value
                abbreviation
            }
            enabled
        }
    }
`;

export const CREATE_OR_UPDATE_SCHOOL = gql`
    mutation($input: SchoolInput!) {
        createOrUpdateSchool(input: $input) {
            address
            id
            issuer
            logo
            name
            phone
            more_resources_link
            emergency_services {
                id
                name
                phone
            }
            resources
            plan {
                frequency
                id
                name
                sessions_count
            }
            state {
                id
                value
                abbreviation
            }
        }
    }
`;

export const CHANGE_ENABLE_STATUS = gql`
    mutation($schoolId: Int!, $enabled: Boolean!) {
        update_school(
            where: { id: { _eq: $schoolId } }
            _set: { enabled: $enabled }
        ) {
            returning {
                enabled
            }
        }
    }
`;
