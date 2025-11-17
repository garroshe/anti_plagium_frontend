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
      $isChecking={isChecking}
      $text={text}
    >
      <Trash2 size={18} />
      Очистити
    </StyledClearButton>
  );
};
