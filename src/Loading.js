/**@jsx jsx */
import { css, jsx } from "@emotion/core";
import { Loader } from "@livechat/design-system";

const containerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
    return (
        <div css={containerCss}>
            <Loader size="large" />
        </div>
    );
};

export default Loading;