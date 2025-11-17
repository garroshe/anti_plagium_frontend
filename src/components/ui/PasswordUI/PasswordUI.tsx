import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styled from "styled-components";

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
        // react-hook-form's field.onChange can accept both event and value
        // Pass the value directly
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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PasswordWrapper = styled.div<{ $error: boolean }>`
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

const StyledPassword = styled.input`
  flex: 1;
  padding: 10px 0;
  border: none;
  outline: none;
`;

const Toggle = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: #999;
  padding: 4px;

  &:hover {
    color: #333;
  }
`;

const ErrorText = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #ff4d4f;
`;
