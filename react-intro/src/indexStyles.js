import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
  }

  main {
    padding: 20px;
  }
`;

export const SongArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-top: 90px;
`;