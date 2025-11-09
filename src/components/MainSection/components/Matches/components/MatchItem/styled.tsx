import styled from "styled-components";

export const StyledMatchItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StyledMatchItemTitle = styled.a`
  font-size: 1.125rem;
  font-weight: 600;
  color: #667eea;
  text-decoration: none;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const StyledMatchItemSimilarity = styled.span`
  padding: 0.25rem 0.75rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;

export const StyledMatchItemSnippet = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

export const StyledMatchItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }
`;
