import React, { useEffect, useState, useRef } from "react";
import { accountsSdk } from "@livechat/accounts-sdk";
import { authRef } from "./authRef";
import Loading from "../Loading";

const Auth = ({ children, signIn, clientId }) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(null);
    const authInstance = useRef(null);

    useEffect(() => {
        authInstance.current = accountsSdk.init({
            client_id: clientId,
            onIdentityFetched: (error, data) => {
                if (data) {
                    authRef.token = data.access_token;
                    setAuth(data);
                }
                if (error) {
                    console.error(error);
                }
                setLoading(false);
            }
        });
    }, [clientId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={auth}>
            {auth !== null ? children : signIn(authInstance)}
        </AuthContext.Provider>
    );
};

export const AuthContext = React.createContext(null);
export default Auth;