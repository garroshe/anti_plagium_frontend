import React, {forwardRef} from "react";

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

export const EditorText = forwardRef<HTMLTextAreaElement, EditorTextPropsType>(
    ({ text, setText, isChecking }, ref) => {
        return (
            <StyledEditorText>
                <StyledEditorLabel>Введіть текст для перевірки</StyledEditorLabel>

                <StyledEditorTextArea
                    ref={ref}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Вставте або введіть текст..."
                    disabled={isChecking}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />

                <StyledEditorWrapper>
                    <StyledEditorWordsCount>{text.length} символів</StyledEditorWordsCount>
                </StyledEditorWrapper>
            </StyledEditorText>
        );
    }
);
