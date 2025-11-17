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
      disabled={isChecking || !text}
      $isChecking={isChecking}
      $text={text}
    >
      <Search size={18} />
      {isChecking ? "Перевірка..." : "Перевірити"}
    </StyledCheckButton>
  );
};
