import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    font-size: 1.6em;
    font-family: 'Montserrat', sans-serif;
    color: white;
    background: #343d4b;
    margin: 0 auto;

}
`;

export default GlobalStyles;
