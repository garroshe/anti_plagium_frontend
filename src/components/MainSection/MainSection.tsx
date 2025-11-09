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

    const checkPromise = fetch(`${import.meta.env.VITE_API_URL}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        options: {
          blockSize: 4,
          concurrency: 3,
        },
      }),
    });

    const progressPromise = (async () => {
      for (const stage of STAGES) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProgress(stage.percent);
        setCurrentStageText(stage.text);
      }
    })();

    try {
      const response = await checkPromise;

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Помилка при перевірці тексту");
      }

      const data: PlagiarismResult = await response.json();

      await progressPromise;

      setResult(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Сталася помилка при перевірці тексту");
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
    if (!result) return;

    const reportHTML = generateReportHTML(result, text);

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

  const generateReportHTML = (result: PlagiarismResult, originalText: string): string => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getUniquenessColor = (percent: number) => {
      if (percent >= 80) return "#10b981";
      if (percent >= 60) return "#f59e0b";
      return "#ef4444";
    };

    const matchesHTML = result.checkedResults
      .map((item, index) => {
        const foundMatches = item.matches.filter((m) => m.similarity > 15);
        if (foundMatches.length === 0) return "";

        return `
          <div style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; border-left: 4px solid ${item.found ? "#ef4444" : "#10b981"};">
            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">
              Блок ${index + 1} ${item.found ? "Знайдено збіги" : "✓ Унікальний"}
            </h3>
            <p style="margin: 0 0 20px 0; color: #4b5563; line-height: 1.6; font-style: italic;">
              "${item.sentence}"
            </p>
            
            ${
              foundMatches.length > 0
                ? `
              <div style="margin-top: 15px;">
                <h4 style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Знайдені джерела:</h4>
                ${foundMatches
                  .map(
                    (match) => `
                  <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-weight: 600; color: #1f2937; font-size: 14px;">${match.title}</span>
                      <span style="padding: 4px 12px; background: ${match.similarity > 30 ? "#fee2e2" : "#fef3c7"}; color: ${match.similarity > 30 ? "#dc2626" : "#d97706"}; border-radius: 12px; font-size: 12px; font-weight: 600;">
                        ${match.similarity}% схожості
                      </span>
                    </div>
                    <p style="margin: 8px 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                      ${match.snippet}
                    </p>
                    <a href="${match.url}" target="_blank" style="color: #3b82f6; text-decoration: none; font-size: 12px; word-break: break-all;">
                      ${match.url}
                    </a>
                    ${
                      match.matchedPhrases.length > 0
                        ? `
                      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                        <span style="font-size: 12px; color: #6b7280;">Спільні слова: </span>
                        <span style="font-size: 12px; color: #4b5563;">${match.matchedPhrases.slice(0, 10).join(", ")}${match.matchedPhrases.length > 10 ? "..." : ""}</span>
                      </div>
                    `
                        : ""
                    }
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>
        `;
      })
      .filter(Boolean)
      .join("");

    return `
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Звіт перевірки на плагіат</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #e5e7eb;
    }
    .header h1 {
      font-size: 32px;
      color: #111827;
      margin-bottom: 10px;
    }
    .header p {
      color: #6b7280;
      font-size: 14px;
    }
    .summary {
      display: flex;
      gap: 20px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .summary-card {
      flex: 1;
      min-width: 200px;
      padding: 25px;
      background: #f9fafb;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }
    .summary-card h3 {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .summary-card .value {
      font-size: 36px;
      font-weight: bold;
      color: #1f2937;
    }
    .original-text {
      margin-bottom: 40px;
      padding: 25px;
      background: #f9fafb;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }
    .original-text h2 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #111827;
    }
    .original-text p {
      color: #4b5563;
      line-height: 1.8;
      white-space: pre-wrap;
    }
    .results h2 {
      font-size: 24px;
      margin-bottom: 25px;
      color: #111827;
    }
    @media print {
      body { padding: 20px; }
      .summary { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Звіт перевірки на плагіат</h1>
      <p>Згенеровано: ${formatDate(result.checkedAt)}</p>
    </div>

    <div class="summary">
      <div class="summary-card">
        <h3>Унікальність</h3>
        <div class="value" style="color: ${getUniquenessColor(result.uniqueness)};">
          ${result.uniqueness}%
        </div>
      </div>
      <div class="summary-card">
        <h3>Перевірено блоків</h3>
        <div class="value">${result.totalSentences}</div>
      </div>
      <div class="summary-card">
        <h3>Знайдено збігів</h3>
        <div class="value">${result.checkedResults.filter((r) => r.found).length}</div>
      </div>
      <div class="summary-card">
        <h3>Всього джерел</h3>
        <div class="value">${result.checkedResults.reduce((sum, r) => sum + r.matches.filter((m) => m.similarity > 15).length, 0)}</div>
      </div>
    </div>

    <div class="original-text">
      <h2>📝 Оригінальний текст</h2>
      <p>${originalText}</p>
    </div>

    <div class="results">
      <h2>🔍 Детальні результати</h2>
      ${matchesHTML || '<p style="color: #6b7280;">Збігів не знайдено. Текст повністю унікальний!</p>'}
    </div>

    <div style="margin-top: 60px; padding-top: 30px; border-top: 2px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
      <p>Цей звіт згенеровано автоматично системою перевірки на плагіат</p>
      <p style="margin-top: 5px;">© ${new Date().getFullYear()} Anti-Plagiarism System</p>
    </div>
  </div>
</body>
</html>
    `;
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
