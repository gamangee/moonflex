import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    };
    body{
        color:${(props) => props.theme.white.darker};
        padding: 0;
        margin: 0;
        background-color: #000;
        line-height: 1.2;
    };
    button{
        cursor: pointer;
        outline: none;
    };
    a{
         text-decoration:none;
         color:inherit;
     }

`;

export default GlobalStyle;
