import { css, jsx } from "@emotion/core";

const linkCss = css`
  color: #5a6976;
  display: inline-block;
  font-size: 16px;
  line-height: 1.5;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 8px 24px 9px;
  cursor: pointer;

  &:hover {
    border-color: #888;
    color: #5a6976;
  }

  > span {
    color: #f56e21;
  }
`;

/** @jsx jsx */
const LogInWithLiveChat = props => {
    return (
        <a css={linkCss} {...props}>
            Sign in with Live<span>Chat</span>
        </a>
    );
};

export default LogInWithLiveChat;