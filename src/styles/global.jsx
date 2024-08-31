/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const style = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  input {
    outline: none;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, sans-serif;
  }
  body,
  html {
    background-color: #02000e;
    min-height: 100vh;
  }

  :root {
    --black-200: #02000e;
    --black-100: #181d26;
    --gray-300: #67666e;
    --gray-200: #828282;
    --gray-blue: #8c92ab;
    --gray-100: #a3a5a8;
    --white: #f7f7f8;
    --coralpink: #f96d69;
    --hotpink: #fe5493;
  }
`;

// 글로벌 스타일 정의
const GlobalStyles = () => <Global styles={style} />;

export default GlobalStyles;
