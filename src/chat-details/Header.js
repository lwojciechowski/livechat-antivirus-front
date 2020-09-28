/**@jsx jsx*/
import { jsx, css } from "@emotion/core";

const headerCss = css`
  font-size: 16px;
  border-bottom: 1px solid #eaeaec;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  &:not(:first-of-type) {
    margin-top: 1.8em;
  }
`;

const Header = ({ children, ...rest }) => {
    return (
        <h2 css={headerCss} {...rest}>
            {children}
        </h2>
    );
};

export default Header;