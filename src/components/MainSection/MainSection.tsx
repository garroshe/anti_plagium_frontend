import { useRef, useState } from "react";
import { Button, message } from "antd";

import { CheckButton } from "../../features/CheckButton";
import { ClearButton } from "../../features/ClearButton";
import { PasteTextButton } from "../../features/PasteTextButton";
import { useUserFetchQuery } from "../../hooks/use-user-fetch-query.ts";
import { userTextsService } from "../../services/userTextsService.ts";
import type { PlagiarismResult } from "../../types";
import { getUniquenessColor } from "../../utils/get-uniqueness-color.ts";
import { renderReportTemplate } from "../../utils/report/report-template.ts";
import { ActionsWrapper } from "./components/ActionsWrapper/ActionsWrapper.tsx";
import { DownloadReportButton } from "./components/DownloadReportButton/DownloadReportButton.tsx";
import { EditorText } from "./components/EditorText/EditorText.tsx";
import { Matches } from "./components/Matches/Matches.tsx";
import { NewCheckButton } from "./components/NewCheckButton/NewCheckButton.tsx";
import { ProgressBar } from "./components/ProgressBar/ProgressBar.tsx";
import { STAGES } from "./constants.ts";
import { useFetchQueryMutation } from "./hooks/use-fetch-query-mutation.ts";
import {
  StyledClearAndPasteButtonWrapper,
  StyledMainSection,
  StyledResultChecked,
  StyledResultSection,
  StyledResultSomeThing,
  StyledResultTitle,
  StyledResultWrapper,
  StyledUniqueness,
  StyledUniquenessScore,
} from "./styled.tsx";

export const MainSection = () => {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [currentStageText, setCurrentStageText] = useState("");
  const [lastSavedTextId, setLastSavedTextId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { userFetch } = useUserFetchQuery();
  const { mutate } = useFetchQueryMutation();

  const saveCheckedText = async (textToSave: string, resultToSave: PlagiarismResult) => {
    const uid = localStorage.getItem("userId");
    if (!uid) return null;

    try {
      const docRef = await userTextsService.create({
        uid,
        text: textToSave,
        result: resultToSave,
        uniqueness: resultToSave.uniqueness,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving checked text:", error);
      return null;
    }
  };

  const handleCheck = async () => {
    if (!text.trim()) return;

    setIsChecking(true);
    setProgress(0);

    const progressPromise = (async () => {
      for (const stage of STAGES) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProgress(stage.percent);
        setCurrentStageText(stage.text);
      }
    })();

    mutate(
      { text },
      {
        onSuccess: async (response) => {
          await progressPromise;
          setResult(response);
          setIsChecking(false);

          if (userFetch) {
            const docId = await saveCheckedText(text, response);
            setLastSavedTextId(docId);
          }
        },
        onError: () => {
          alert("Помилка при перевірці тексту");
          setIsChecking(false);
        },
      },
    );
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setProgress(0);
    setCurrentStageText("");
    setLastSavedTextId(null);
  };

  const handlePaste = async () => {
    const paste = await navigator.clipboard.readText();
    const element = textareaRef.current;
    if (!element) return;

    const start = element.selectionStart;
    const end = element.selectionEnd;

    const newText = text.slice(0, start) + paste + text.slice(end);

    setText(newText);

    requestAnimationFrame(() => {
      if (!element) return;
      element.selectionStart = element.selectionEnd = start + paste.length;
      element.focus();
    });
  };

  const handleDownload = () => {
    if (!result) return;

    const reportHTML = renderReportTemplate(result, text);

    const blob = new Blob([reportHTML], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `plagiarism-report-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveFavorite = async () => {
    if (!userFetch?.uid || !lastSavedTextId) return;
    try {
      await userTextsService.setFavorite(userFetch.uid, lastSavedTextId, true);
      message.success("Збережено в обране");
    } catch (error) {
      console.error(error);
      message.error("Не вдалося зберегти");
    }
  };

  return (
    <StyledMainSection>
      {!result ? (
        <>
          <EditorText ref={textareaRef} text={text} isChecking={isChecking} setText={setText} />

          {isChecking && <ProgressBar progress={progress} currentStageText={currentStageText} />}

          <ActionsWrapper>
            <StyledClearAndPasteButtonWrapper>
              <ClearButton text={text} isChecking={isChecking} handleReset={handleReset} />
              <PasteTextButton onClick={handlePaste} />
            </StyledClearAndPasteButtonWrapper>
            <CheckButton text={text} isChecking={isChecking} handleCheck={handleCheck} />
          </ActionsWrapper>
        </>
      ) : (
        <>
          <StyledResultSection>
            <StyledUniquenessScore>
              <StyledResultWrapper>
                <StyledResultSomeThing
                  style={{
                    border: `8px solid ${getUniquenessColor(result.uniqueness)}`,
                  }}
                />
                <StyledUniqueness style={{ color: getUniquenessColor(result.uniqueness) }}>
                  {result.uniqueness}%
                </StyledUniqueness>
              </StyledResultWrapper>
              <StyledResultTitle>Унікальність тексту</StyledResultTitle>
              <StyledResultChecked>Перевірено {result.checkedAt}</StyledResultChecked>
            </StyledUniquenessScore>

            <Matches result={result} />
          </StyledResultSection>

          <ActionsWrapper>
            <DownloadReportButton handleDownload={handleDownload} />
            {userFetch && (
              <Button type="default" onClick={handleSaveFavorite} disabled={!lastSavedTextId}>
                Зберегти в обране
              </Button>
            )}
            <NewCheckButton handleReset={handleReset} />
          </ActionsWrapper>
        </>
      )}
    </StyledMainSection>
  );
};
