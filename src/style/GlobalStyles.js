import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  
  body {
    width: 100%;
    min-width: 320px;
    min-height: calc(100vh);
    margin: 0;
  }
`;

export default GlobalStyles;
