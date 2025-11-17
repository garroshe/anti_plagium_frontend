import styled from "styled-components";

export const StyledMainSection = styled.div`
  background: white;
  border-radius: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 1rem;
  }
`;

export const StyledResultSection = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StyledResultTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }
`;

export const StyledResultChecked = styled.p`
  color: #6b7280;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const StyledUniquenessScore = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  border-radius: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const StyledUniqueness = styled.div`
  font-size: 3rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const StyledResultWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-bottom: 0.75rem;
  }
`;

export const StyledResultSomeThing = styled.div`
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  opacity: 0.2;

  @media (max-width: 768px) {
    inset: 5px;
  }
`;

export const StyledClearAndPasteButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`