import styled from 'styled-components';

export const HeaderStyles = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    background-color: #fdc029;
    color: #171820;
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 1000;

    h1 {
        font-size: 2em;
        font-weight: bolder;
    }

    #header-menu-icon {
        cursor: pointer;
        font-size: 2em;
        color: #171820;
        margin-left: 20px;

        &:hover {
            color: #fff;
            transition: all 0.1s ease-in-out;
        }
        &:active {
            color: #df861d;
            transform: scale(1.2);
            transition: all 0.1s ease-in-out;
        }
    }

    #header-menu-right {
        padding-right: 20px;
    }

    #header-menu-center {
        a {
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            color: #171820;


            &:hover {
                opacity: 0.85;
                transition: all 0.1s ease-in-out;
            }

            &:active {
                color: #fff;
                transition: all 0.1s ease-in-out;
            }
        }

        svg {
            width: 25px;
            height: 25px;
        }
    }
`;


//Side Menu Styling

export const SideMenu = styled.div`
    background-color: #171820;
    opacity: 0.99;
    color: #fff;
    padding: 10px 20px;
    position: fixed;
    z-index: 1000;
    height: 90vh;
    width: 250px;
    overflow-y: scroll;
    scrollbar-color: #fdc029 #171820;
    scrollbar-width: thin;
    font-size: .8em;
    left: -300px;
    transition: left 0.3s ease-in-out;
    margin-top: 90px;

    h1 {
        color: #fdc029;
        font-size: 2em;
    }


    h2 {
        color: #fdc029;
        font-size: 1.5em;
        font-weight: bolder;
        margin: 10px 0;
    }

    h3 {
        color: #fff;
        font-size: 1.2em;
        font-weight: bolder;
        margin: 10px 0;

        &:first-letter {
            text-transform: uppercase;
        }
    }


    img {
        width: 100%;
        max-width: 150px;
        height: auto;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
    }

    &.hidden {
        left: -300px;
    }

    &.visible {
        left: 0;
    }

    .side-menu-container {
        border-bottom: 1px solid #fdc029;
        margin-bottom: 22px;

        .side-menu-info {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: .8em;
            color: #fdc029;
            margin-top: 10px;

            p {
                margin: 0;
                font-size: 1.2em;
            }
        }

        .side-menu-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px;

            p {
                margin: 0;
                color: #fff;
            }
        }

        svg {
            color: #fdc029;
            font-size: 1.2em;
            transition: all 0.3s ease-in-out;
            padding: 0 5px;

            &:hover {
                color: #df861d;
                cursor: pointer;
                transform: scale(1.2);
                transition: all 0.1s ease-in-out;
            }

            &:active {
                color: #fff;
            }
        }
    }

    .side-menu-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        margin-bottom: 10px;

        svg {
            color: #fdc029;
            font-size: 1.2em;
            transition: all 0.3s ease-in-out;
            padding: 0 5px;

            &:hover {
                color: #df861d;
                cursor: pointer;
                transform: scale(1.2);
                transition: all 0.1s ease-in-out;
            }

            &:active {
                color: #fff;
            }
        }
    }
`;