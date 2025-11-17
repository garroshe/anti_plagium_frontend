import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { ErrorText, PasswordWrapper, StyledPassword, Toggle, Wrapper } from "./styled.tsx";

type PasswordUIProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
};

export const PasswordUI = forwardRef<HTMLInputElement, PasswordUIProps>(
  ({ value, onChange, placeholder, error }, ref) => {
    const [show, setShow] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const inputValue = e.target.value;
        onChange(inputValue);
      }
    };

    return (
      <Wrapper>
        <PasswordWrapper $error={!!error}>
          <StyledPassword
            ref={ref}
            type={show ? "text" : "password"}
            value={value || ""}
            placeholder={placeholder}
            onChange={handleChange}
          />
          <Toggle onClick={() => setShow(!show)}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</Toggle>
        </PasswordWrapper>

        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  },
);
