import React, {useEffect, useState} from "react";
import Loading from "../Loading";
import queryString from "query-string";
import {createInstallation} from "../api";



const redirectUri = `https://accounts.livechat.com/?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
const Install = ({ location }) => {
    const [queryParams] = useState(queryString.parse(location.search));

    useEffect(() => {
        (async () => {
            if (queryParams.code) {
                await createInstallation(queryParams.code);
                window.close();
                return;
            }

            window.location.replace(redirectUri);
        })();
    }, [queryParams.code]);

    return (
        <Loading />
    );
}

export default Install;