import styled from 'styled-components';

export const SongDetailsContainer = styled.div`
    text-align: center;
    padding: 20px;

    img {
      width: 300px;
      height: 300px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 2em;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.5em;
      color: #df861d;
      margin-bottom: 20px;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    p {
      font-size: 1.2em;
      margin: 5px 0;
    }
`;

export const ImageContainer = styled.div`
    background-color: #171820;
    padding: 20px;
    border-radius: 15px;
`;