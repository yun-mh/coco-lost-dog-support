import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { VIEW_DOG } from "../../queries/MainQuery";
import DogPresenter from "./DogPresenter";

const DogContainer = ( location ) => {
    const { dogId } = useParams();

    const [user, setUser] = useState("");

    const { loading, data } = useQuery(VIEW_DOG, { variables: { id: dogId } });
    
    useEffect(() => {
        if (data !== undefined && location.location.search !== "") {
            const userId = location.location.search.split("?owner=")[1];
            data.viewDog.user.id === userId ? setUser(userId) : setUser("");
        }
    }, [location, data]);

    return <DogPresenter user={user} loading={loading} data={data} />
}

export default withRouter(DogContainer);