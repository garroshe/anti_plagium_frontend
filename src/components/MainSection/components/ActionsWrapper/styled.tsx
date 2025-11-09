import styled from "styled-components";

export const StyledActionsWrapper = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }
`;
