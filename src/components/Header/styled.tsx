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

export const StyledHeaderSubTitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;
