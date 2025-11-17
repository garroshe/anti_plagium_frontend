export const renderMatches = (result: any): string => {
    return result.checkedResults
        .map((item, index) => {
            const matches = item.matches.filter((m: any) => m.similarity > 15);
            if (matches.length === 0) return "";

            return `
        <div style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; border-left: 4px solid ${
                item.found ? "#ef4444" : "#10b981"
            };">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">
            Блок ${index + 1} ${item.found ? "Знайдено збіги" : "✓ Унікальний"}
          </h3>

          <p style="margin: 0 0 20px 0; color: #4b5563; line-height: 1.6; font-style: italic;">
            "${item.sentence}"
          </p>

          <div style="margin-top: 15px;">
            <h4 style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Знайдені джерела:</h4>

            ${matches
                .map(
                    (match: any) => `
                <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-weight: 600; color: #1f2937; font-size: 14px;">${match.title}</span>
                    <span style="padding: 4px 12px; background: ${
                        match.similarity > 30 ? "#fee2e2" : "#fef3c7"
                    }; color: ${match.similarity > 30 ? "#dc2626" : "#d97706"}; border-radius: 12px; font-size: 12px; font-weight: 600;">
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
                        match.matchedPhrases.length
                            ? `
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                      <span style="font-size: 12px; color: #6b7280;">Спільні слова: </span>
                      <span style="font-size: 12px; color: #4b5563;">
                        ${match.matchedPhrases.slice(0, 10).join(", ")}${
                                match.matchedPhrases.length > 10 ? "..." : ""
                            }
                      </span>
                    </div>`
                            : ""
                    }
                </div>
              `
                )
                .join("")}
          </div>
        </div>`;
        })
        .join("");
};
