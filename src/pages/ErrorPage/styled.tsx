import styled from "styled-components";

export const StyledErrorPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 250px;
`

export const StyledTitle = styled.h2`
    font-size: 36px;
    margin: 20px 0;
    font-weight: bold;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
`

export const StyledButton = styled.button`
    padding: 15px 40px;
    background: white;
    color: #667eea;
    border: none;
    border-radius:50px;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
`

export const StyledError = styled.div`
    font-size: 150px;
    font-weight: bold;
    text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    line-height: 1;
    animation: glitch 2s infinite;

    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`