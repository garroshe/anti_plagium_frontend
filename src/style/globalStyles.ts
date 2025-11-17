import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: 'Inter', sans-serif;
      color: #f2f2f2;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
  }
  
  body {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      background: #667eea;
  }
`;
