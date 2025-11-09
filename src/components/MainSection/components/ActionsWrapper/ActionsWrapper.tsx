import type { ReactNode } from "react";

import { StyledActionsWrapper } from "./styled.tsx";

type ActionsWrapperPropsType = {
  children: ReactNode;
};

export const ActionsWrapper = ({ children }: ActionsWrapperPropsType) => {
  return <StyledActionsWrapper>{children}</StyledActionsWrapper>;
};
