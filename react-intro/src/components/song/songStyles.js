import styled from 'styled-components';

export const SongMainContainer = styled.div`
    padding: 15px;
    background-color: #bcb6ae;
    border-radius: 25px;
    max-width: 400px;
    display: flex;
    margin: 20px;
    max-height: 450px;
    max-width: 320px;
`;

export const SongListArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const SongContainer = styled.div`
display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border-radius: 15px;
    background-color: #171820;
    color: #fdc029;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    min-height: 400px;
    min-width: 275px;

    img {
        width: 100%;
        max-width: 250px;
        max-height: 250px;
        min-width: 250px;
        min-height: 250px;
        border-radius: 5px;
        margin: 3px;

        &:hover {
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease-in-out;
        }
`;

export const SongInfoContainer = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h2, h3, p {
        margin: 8px 0;
    }
    
    h2, h3 {
        font-size: 1.1em;
    }
    
    h3 {
        color: #fff;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    p {
        font-size: 0.9em;
        color: #bcb6ae;
    }
`;

export const SongInfoRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    svg {
        cursor: pointer;
        color: ${({ $isFavorite }) => ($isFavorite ? '#4caf50' : '#fff')};
        background-color: ${({ $isFavorite }) => ($isFavorite ? '#4caf50' : '#df861d')};
        padding: 4px;
        border-radius: 50%;
        width: 30px;
        height: 30px;

        &:hover {
            background-color: #fff;
            color: ${({ $isFavorite }) => ($isFavorite ? '#fff' : '#df861d')};
            transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
        }

        &:active {
            background-color: ${({ $isFavorite }) => ($isFavorite ? '#388e3c' : '#df861d')};
            color: ${({ $isFavorite }) => ($isFavorite ? '#388e3c' : '#fff')};
            transform: scale(1.1);
            transition: transform 0.1s ease-in-out;
        }
    }
`;

export const SearchArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        width: 50px;
        height: 20px;
        margin: 10px;
        border-radius: 5px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        background-color: #fff;

        &:hover {
            background-color: #fdc029;
            color: #fff;
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        }

        &:active {
            background-color: #df861d;
            color: #fff;
            transform: scale(1.1);
            transition: transform 0.1s ease-in-out;
        }
    }

    input {
        width: 200px;
        height: 20px;
        background-color: #fff;
        border: 1px solid #171820;

        &:focus {
            outline: none;
            border-color: #df861d;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        }

        &::placeholder {
            color: #171820;
            font-size: 1.1em;
            font-weight: 500;
            text-align: center;
        }
    }
`;

