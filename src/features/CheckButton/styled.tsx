import styled from "styled-components";

export const StyledCheckButton = styled.button<{$text: string, $isChecking: boolean}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
    background: ${({$text, $isChecking}) => $isChecking || !$text ? "#9ca3af" : "linear-gradient(135deg, #667eea, #764ba2)"};
    cursor: ${({$isChecking, $text}) => $isChecking || !$text ? "not-allowed" : "pointer"};
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
`;
