import { useState } from "react";

import type { PlagiarismResult } from "../../type";
import { ActionsWrapper } from "./components/ActionsWrapper/ActionsWrapper.tsx";
import { CheckButton } from "./components/CheckButton/CheckButton.tsx";
import { ClearButton } from "./components/ClearButton/ClearButton.tsx";
import { DownloadReportButton } from "./components/DownloadReportButton/DownloadReportButton.tsx";
import { EditorText } from "./components/EditorText/EditorText.tsx";
import { Matches } from "./components/Matches/Matches.tsx";
import { NewCheckButton } from "./components/NewCheckButton/NewCheckButton.tsx";
import { ProgressBar } from "./components/ProgressBar/ProgressBar.tsx";
import { STAGES } from "./constants.ts";
import {
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

  const handleCheck = async (): Promise<void> => {
    if (!text.trim()) return;

    setIsChecking(true);
    setProgress(0);

    for (const stage of STAGES) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setProgress(stage.percent);
      setCurrentStageText(stage.text);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Помилка при перевірці тексту");

      const data: PlagiarismResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Сталася помилка при перевірці тексту");
    } finally {
      setIsChecking(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setProgress(0);
    setCurrentStageText("");
  };

  const handleDownload = () => {
    console.log("Downloading report...");
  };

  const getUniquenessColor = (percent: number) => {
    if (percent >= 80) return "#10b981";
    if (percent >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <StyledMainSection>
      {!result ? (
        <>
          <EditorText text={text} isChecking={isChecking} setText={setText} />

          {isChecking && <ProgressBar progress={progress} currentStageText={currentStageText} />}

          <ActionsWrapper>
            <ClearButton text={text} isChecking={isChecking} handleReset={handleReset} />
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
            <NewCheckButton handleReset={handleReset} />
          </ActionsWrapper>
        </>
      )}
    </StyledMainSection>
  );
};
