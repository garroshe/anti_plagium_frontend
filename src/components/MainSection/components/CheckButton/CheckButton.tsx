import React from "react";
import { Search } from "lucide-react";

import { StyledCheckButton } from "./styled.tsx";

type CheckButtonPropsType = {
  text: string;
  isChecking: boolean;
  handleCheck: () => Promise<void>;
};

export const CheckButton = ({ handleCheck, isChecking, text }: CheckButtonPropsType) => {
  return (
    <StyledCheckButton
      onClick={handleCheck}
      disabled={isChecking || !text.trim()}
      style={{
        background: isChecking || !text.trim() ? "#9ca3af" : "linear-gradient(135deg, #667eea, #764ba2)",
        cursor: isChecking || !text.trim() ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isChecking && text.trim()) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        }
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Search size={18} />
      {isChecking ? "Перевірка..." : "Перевірити"}
    </StyledCheckButton>
  );
};
