import { CheckCircle } from "lucide-react";

import { StyledNewCheckButton } from "./styled.tsx";

type NewCheckButtonPropsType = {
  handleReset: () => void;
};

export const NewCheckButton = ({ handleReset }: NewCheckButtonPropsType) => {
  return (
    <StyledNewCheckButton
      onClick={handleReset}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      }}
    >
      <CheckCircle size={18} />
      Нова перевірка
    </StyledNewCheckButton>
  );
};
