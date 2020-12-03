/**@jsx jsx */

import { useEffect, useState, useRef, Fragment } from "react";
import { css, jsx } from "@emotion/core";
import Header from "./Header";
import * as LiveChat from "@livechat/agent-app-sdk";
import Loading from "../Loading";
import {getFiles} from "../api";
import { Button, Banner } from "@livechat/design-system";
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';


const containerCss = css`
    padding: 10px;
    
   .file {
        position: relative;
        margin-bottom: 1em;
        background: #f7f7f7;
        .icon {
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .material-check-circle-icon path {
            fill: #2a9558;
        }
        
        .material-alert-circle-icon path {
            fill: #a2260d;
        }
        &.FOUND {
            background: #fbeae7;
        }
        border-radius: 5px;
        padding: 1em;
        
        span { 
            display: block;
        }
        
        .name {
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
        }
        
        .found {
            margin-top: 1em;
            color: #D93312;
            font-weight: bold;
        }
        
        .download {
            margin-top: 1em;
        }
        
        .date {
            font-size: 0.9em;
            margin-top: 4px;
        }
    }
    


`;

const ChatDetails = () => {
    const [customer, setCustomer] = useState(null);
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(true);
    const widget = useRef();

    useEffect(() => {
        const handler = customer => {
            setCustomer(customer);
            setLoading(true);
            console.log(customer);
        };

        LiveChat.createDetailsWidget().then(w => {
            widget.current = w;
            widget.current.on("customer_profile", handler);
        });

        return () => {
            if (widget.current) {
                widget.current.off("*", handler);
            }
        }
    }, []);

    useEffect(() => {
        if (!customer) {
            return;
        }

        widget.current.modifySection({
            title: "Last scanned files",
            components: [{
                type: "title",
                data: {
                    title: "loading",
                },
            }]
        });

        let current = true;

        const get = () => {
            getFiles(customer.id).then(files => {
                if (current) {
                    console.log(files);
                    setFiles(files);
                    setLoading(false);
                }
            }).catch(err => {
                console.error("Bad request", err);
            });
        }

        get();
        const t = setInterval(get, 3000);

        return () => {
            clearInterval(t);
            current = false;
        };
    }, [customer]);

    useEffect(() => {
        if(!widget.current) {
            return;
        }

        if (files.length > 0) {
        widget.current.modifySection({
            title: "Last scanned files",
            components: files.slice(0, 3).map(f => ({
                type: "title",
                data: {
                    title: f.name,
                    description: f.status === "OK" ? "File safe" : "File infected!",
                    clickable: true,
                    openApp: true,
                },
            }))
        })} else {
            widget.current.modifySection({
                title: "Last scanned files",
                components: [{
                    type: "title",
                    data: {
                        title: "No files found",
                    },
                }]
            });
        }
    }, [files])

    if(loading) {
        return <Loading />;
    }

    if (!files.length) {
       return <Banner type="success">Customer sent no files.</Banner>
    }

    return (
        <div css={containerCss}>
            <Header>Files sent by customer</Header>

            {files.map(f => (
                    <div className={"file " + f.status} key={f.event_id}>
                        <span className="name" title={f.name}>{f.name}</span>
                        <span className="date">Received on {f.created_at.toLocaleDateString()} at {f.created_at.toLocaleTimeString()}</span>

                        {f.status === "FOUND" && (
                            <Fragment>
                                <span className="found">Infected with {f.signature}</span>
                                <AlertCircleIcon className="icon"/>
                            </Fragment>
                        )}

                        {f.status === "OK" && (
                            <Fragment>
                                <form action={f.url} target="_blank">
                                    <Button size="compact" kind="primary" className="download" type="submit">
                                        Download
                                    </Button>
                                </form>
                                <CheckCircleIcon  className="icon"/>
                            </Fragment>
                        )}
                    </div>
                )
            )}
        </div>
    );
}

export default ChatDetails;