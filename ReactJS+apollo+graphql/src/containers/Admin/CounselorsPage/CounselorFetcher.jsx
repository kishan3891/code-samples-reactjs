import React from "react";
import service from "Services/counselor";
import { useQuery } from "@apollo/react-hooks";

const CounselorFetcher = ({ render }) => {
    const { loading, error, data } = useQuery(service.QUERIES.GET_COUNSELORS);
    if (loading) {
        return render({ loading });
    }
};
