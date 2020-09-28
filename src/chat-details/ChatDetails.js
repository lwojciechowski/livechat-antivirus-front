/**@jsx jsx */

import { useEffect, useState } from "react";
import { css, jsx } from "@emotion/core";
import Header from "./Header";
import * as LiveChat from "@livechat/agent-app-sdk";
import Loading from "../Loading";
import {getFiles} from "../api";
import Auth from "./Auth";
import LogInWithLiveChat from "./LogInWithLivechat";

const LC_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const fullscreenCss = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const containerCss = css`
    padding: 10px;
    
    table.data {
        width: 100%;
    }
    
    td:first-of-type {
        padding-bottom: 5px;
        font-weight: bold;
    }
    .charge {
        display: flex;
        align-items: center;
        svg {
            margin-right: 10px;
            color: #a2260d;
        }
    }
    .charge.succeeded svg {
        fill: #2a9558;
    }
    .options {
        button:not(:first-of-type) {
            margin-top: 10px;
        }
    }
    .subscription {
        strong {
            font-weight: bold;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        ul li {
            margin: 0;
            padding: 0;
            margin-bottom: 5px;
        }
    }
`;

const ChatDetails = () => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        let widget = null;
        const handler = customer => {
            setCustomer(customer);
            console.log(customer);
        };

        LiveChat.createDetailsWidget().then(w => {
            widget = w;
            widget.on("customer_profile", handler);
        });

        return () => {
            if (widget) {
                widget.off("*", handler);
            }
        }
    });

    useEffect(() => {
        if (!customer) {
            return;
        }
        const t = setInterval(() => {
            getFiles(customer.id).then(response => {
                console.log(response.data);
            }).catch(err => {
                console.error("Bad request", err);
            });
        }, 3000);

        return () => {
            clearInterval(t);
        }
    }, [customer])
    if(!customer) {
        return <Loading />;
    }

    return (
        <Auth
            clientId={LC_CLIENT_ID}
            signIn={authInstanceRef => (
                <div css={fullscreenCss}>
                    <LogInWithLiveChat
                        onClick={() => authInstanceRef.current.openPopup()}
                    />
                </div>
            )}
        >
            <div css={containerCss}>
                <Header>Files sent by customer</Header>
                <table className="data">
                    <tbody>
                    <tr>
                        <td>ID</td>
                        <td>dsa</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Auth>
    );
}

export default ChatDetails;