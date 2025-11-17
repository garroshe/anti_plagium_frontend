import { forwardRef, type InputHTMLAttributes } from "react";
import styled from "styled-components";

type InputUIProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const InputUI = forwardRef<HTMLInputElement, InputUIProps>(({ error, ...rest }, ref) => {
  return (
    <Wrapper>
      <StyledInput ref={ref} $error={!!error} {...rest} />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
`;

const StyledInput = styled.input<{ $error: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid ${({ $error }) => ($error ? "#ff4d4f" : "#d9d9d9")};
  outline: none;

  &:focus {
    border-color: #4096ff;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  margin-top: 4px;
  font-size: 12px;
`;
