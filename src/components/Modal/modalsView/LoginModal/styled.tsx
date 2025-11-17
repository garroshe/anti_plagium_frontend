import styled from "styled-components";

export const StyledAuthContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 480px) {
        padding: 1.25rem 1rem;
    }
`;

export const StyledToggleButton = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 0.5rem;

        button {
            width: 100%;
        }
    }
`;

export const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    input {
        margin-bottom: 0.5rem;
    }

    @media (max-width: 480px) {
        gap: 0.75rem;
    }
`;

export const StyledSocialButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;