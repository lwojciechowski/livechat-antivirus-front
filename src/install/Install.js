/**@jsx jsx */

import React, {useEffect, useState} from "react";
import { css, jsx } from "@emotion/core";
import queryString from "query-string";

import Loading from "../Loading";
import {createInstallation} from "../api";

const redirectUri = `https://accounts.livechat.com/?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  strong {
    font-size: 1.1em;
  }
  button {
    margin-top: 1em;
  }
  button:first-of-type {
    margin-right: 10px;
  }
  p {
    text-align: center;
  }
`;

const Install = ({ location }) => {
    const [loading, setLoading] = useState(true);
    const [queryParams] = useState(queryString.parse(location.search));

    useEffect(() => {
        (async () => {
            if (queryParams.code) {
                await createInstallation(queryParams.code);
                window.close();
                setLoading(false);
                return;
            }

            window.location.replace(redirectUri);
        })();
    }, [queryParams.code]);

    if (loading) {
        return <Loading />
    }

    return (
        <div css={containerCss}>
            <h2>Installation complete</h2>
            <p>
                The plugin will automatically scan all files sent by customers. You may close this window.
            </p>
        </div>
    );
}

export default Install;