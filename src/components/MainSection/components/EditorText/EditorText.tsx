import React from "react";

import {
  StyledEditorLabel,
  StyledEditorText,
  StyledEditorTextArea,
  StyledEditorWordsCount,
  StyledEditorWrapper,
} from "./styled.tsx";

type EditorTextPropsType = {
  text: string;
  setText: (text: string) => void;
  isChecking: boolean;
};

export const EditorText = ({ text, setText, isChecking }: EditorTextPropsType) => {
  return (
    <StyledEditorText>
      <StyledEditorLabel>Введіть текст для перевірки</StyledEditorLabel>
      <StyledEditorTextArea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        placeholder="Вставте або введіть текст, який потрібно перевірити на унікальність..."
        disabled={isChecking}
        onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => (e.target.style.borderColor = "#667eea")}
        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => (e.target.style.borderColor = "#e5e7eb")}
      />
      <StyledEditorWrapper>
        <StyledEditorWordsCount>{text.length} символів</StyledEditorWordsCount>
      </StyledEditorWrapper>
    </StyledEditorText>
  );
};
