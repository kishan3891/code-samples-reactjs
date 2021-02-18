import gql from "graphql-tag";

export const GET_PLANS = gql`
    query {
        plan {
            id
            name
            frequency
            sessions_count
        }
    }
`;
