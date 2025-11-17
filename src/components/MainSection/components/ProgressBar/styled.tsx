import styled from "styled-components";

export const StyledProgressBar = styled.div`
  padding: 0 2rem 2rem 2rem;

  @media (max-width: 768px) {
    padding: 0 1.25rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1rem;
  }
`;

export const StyledProgressBarText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const StyledProgressBarProgress = styled.div`
  background: linear-gradient(90deg, #667eea, #764ba2);
  height: 100%;
  transition: width 0.5s ease;
`;

export const StyledProgressBarWrapper = styled.div`
  background: #f3f4f6;
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
`;
