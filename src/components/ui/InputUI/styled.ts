import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const StyledInput = styled.input<{ $error: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid ${({ $error }) => ($error ? "#ff4d4f" : "#d9d9d9")};
  outline: none;

  &:focus {
    border-color: #4096ff;
  }
`;

export const ErrorText = styled.p`
  color: #ff4d4f;
  margin-top: 4px;
  font-size: 12px;
`;
