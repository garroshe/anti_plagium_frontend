import { forwardRef, type InputHTMLAttributes } from "react";

import { ErrorText, StyledInput, Wrapper } from "./styled.ts";

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
