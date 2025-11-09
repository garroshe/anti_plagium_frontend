import styled from "styled-components";

export const StyledEditorText = styled.div`
  padding: 2rem;
`;

export const StyledEditorLabel = styled.label`
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

export const StyledEditorTextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
  outline: none;
`;

export const StyledEditorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

export const StyledEditorWordsCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;
