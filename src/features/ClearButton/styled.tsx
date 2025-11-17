import styled from "styled-components";

export const StyledClearButton = styled.button<{$text: string, $isChecking: boolean}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.2s;
  cursor:  ${({ $isChecking, $text }) =>  $isChecking || !$text ? "not-allowed" : "pointer"};
  opacity: ${({ $isChecking, $text }) => $isChecking || !$text ? 0.5 : 1};

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;
