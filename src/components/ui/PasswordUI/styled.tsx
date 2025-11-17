import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PasswordWrapper = styled.div<{ $error: boolean }>`
  position: relative;
  border: 1px solid ${({ $error }) => ($error ? "#ff4d4f" : "#d9d9d9")};
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: white;
  transition: 0.2s;

  &:focus-within {
    border-color: ${({ $error }) => ($error ? "#ff4d4f" : "#4096ff")};
    box-shadow: ${({ $error }) => ($error ? "0 0 0 2px rgba(255, 77, 79, 0.2)" : "0 0 0 2px rgba(64, 150, 255, 0.2)")};
  }
`;

export const StyledPassword = styled.input`
  flex: 1;
  padding: 10px 0;
  border: none;
  outline: none;
`;

export const Toggle = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: #999;
  padding: 4px;

  &:hover {
    color: #333;
  }
`;

export const ErrorText = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #ff4d4f;
`;
