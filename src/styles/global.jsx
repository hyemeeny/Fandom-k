/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { Helmet } from "react-helmet";

// 화면 크기 기준 설정
// const breakpoints = {
//   mobile: "480px",
//   tablet: "768px",
//   desktop: "1024px",
// };

// 글로벌 스타일 정의
const GlobalStyles = () => (
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
          
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
          font: inherit;
          vertical-align: baseline;
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
        body {
          line-height: 1;
          font-family: "Pretendard Variable", sans-serif;
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
        :root {
          --black-200: #02000e;
          --black-100: #181d26;
          --gray-300: #67666e;
          --gray-200: #828282;
          --gray-blue: #8c92ab;
          --gray-100: #a3a5a8;
          --white: #F7F7F8;
          --coralpink: #f96d69;
          --hotpink: #fe5493;
          }
        }
      `}
    />
  </>
);

export default GlobalStyles;
