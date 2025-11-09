import React from "react";
import { Trash2 } from "lucide-react";

import { StyledClearButton } from "./styled.tsx";

type ClearButtonPropsType = {
  text: string;
  isChecking: boolean;
  handleReset: () => void;
};

export const ClearButton = ({ handleReset, text, isChecking }: ClearButtonPropsType) => {
  return (
    <StyledClearButton
      onClick={handleReset}
      disabled={isChecking || !text}
      style={{
        cursor: isChecking || !text ? "not-allowed" : "pointer",
        opacity: isChecking || !text ? 0.5 : 1,
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isChecking && text) {
          e.currentTarget.style.background = "#f9fafb";
        }
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = "white";
      }}
    >
      <Trash2 size={18} />
      Очистити
    </StyledClearButton>
  );
};
