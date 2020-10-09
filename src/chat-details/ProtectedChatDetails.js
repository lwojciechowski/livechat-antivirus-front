/**@jsx jsx */

import Auth from "./Auth";
import LogInWithLiveChat from "./LogInWithLivechat";
import ChatDetails from "./ChatDetails";

import {css, jsx} from "@emotion/core";

const LC_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;


const fullscreenCss = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedChatDetails = () => {
    return         (
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
            <ChatDetails />
        </Auth>);
}

export default ProtectedChatDetails;