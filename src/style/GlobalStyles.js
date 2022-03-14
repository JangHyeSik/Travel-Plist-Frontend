import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  body {
    flex-grow: 1;
    width: 100%;
    min-width: 320px;
    margin-top: 5rem;
    min-height: calc(100vh - 20rem);
    font-family: Noto Sans KR, sans-serif;
    margin: 0;
    -ms-overflow-style: none;
    display: flex;
    flex-direction: column;
    @font-face {
      font-family: 'SuncheonB';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/SuncheonB.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
