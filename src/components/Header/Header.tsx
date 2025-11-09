import { FileText } from "lucide-react";

import { StyledHeader, StyledHeaderSubTitle, StyledHeaderTitle, StyledHeaderWrapper } from "./styled.tsx";

export const Header = () => {
  return (
    <StyledHeader>
      <StyledHeaderWrapper>
        <FileText size={window.innerWidth <= 768 ? 32 : 48} />
        <StyledHeaderTitle>Перевірка на плагіат</StyledHeaderTitle>
      </StyledHeaderWrapper>
      <StyledHeaderSubTitle>Витягуємо n-грами → шукаємо в мережі → обчислюємо схожість</StyledHeaderSubTitle>
    </StyledHeader>
  );
};
