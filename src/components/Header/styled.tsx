import styled from "styled-components";

export const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: white;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const StyledHeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const StyledHederTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
`

export const StyledLogoType = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`

export const StyledLoginButton = styled.button`
    padding: 12px 24px;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    &:hover:not(:disabled) {
        background: #1d4ed8;
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        width: 100%;
        text-align: center;
    }
`

export const StyledUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    
    .ant-avatar {
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: all 0.2s ease-in-out;
    }
    
    &:hover .ant-avatar {
        border-color: rgba(255, 255, 255, 0.6);
        transform: scale(1.05);
    }

    @media (max-width: 480px) {
        width: 100%;
        justify-content: space-between;
    }
`
