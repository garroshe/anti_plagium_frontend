import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    font-size: 16px;
  }

  body {
    min-height: 100%;
    font-family: 'Inter', sans-serif;
    color: #f2f2f2;
    margin: 0;
    padding: 2rem;
    width: min(100%, 1200px);
    background: linear-gradient(135deg, #667eea, #764ba2);
    margin-inline: auto;
    transition: padding 0.2s ease;
  }

  #root {
    width: 100%;
  }

  @media (max-width: 1024px) {
    body {
      padding: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    body {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    body {
      padding: 0.75rem;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
  }
`;
