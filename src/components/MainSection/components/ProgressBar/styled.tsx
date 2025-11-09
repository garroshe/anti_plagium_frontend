import styled from "styled-components";

export const StyledProgressBar = styled.div`
  padding: 0 2rem 2rem 2rem;
`;

export const StyledProgressBarText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
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
