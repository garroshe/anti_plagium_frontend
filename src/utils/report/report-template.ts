import { REPORT_STYLES } from "./report-styles";
import { renderMatches } from "./report-matches";
import { formatDate } from "./format-date";
import { getUniquenessColor } from "../get-uniqueness-color";

export const renderReportTemplate = (result: any, originalText: string): string => {
    const matchesHTML = renderMatches(result);

    return `
        <!DOCTYPE html>
        <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Звіт перевірки на плагіат</title>
                <style>${REPORT_STYLES}</style>
            </head>
            <body>
                <div class="container">
                
                    <div class="header">
                        <h1>Звіт перевірки на плагіат</h1>
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
                            <div class="value">${result.checkedResults.filter((r: any) => r.found).length}</div>
                        </div>
                        
                        <div class="summary-card">
                            <h3>Всього джерел</h3>
                            <div class="value">
                                ${result.checkedResults.reduce(
                                (sum: number, r: any) => sum + r.matches.filter((m: any) => m.similarity > 15).length,
                                0
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div class="original-text">
                        <h2>Оригінальний текст</h2>
                        <p>${originalText}</p>
                    </div>
                    
                    <div class="results">
                        <h2>Детальні результати</h2>
                        ${matchesHTML || '<p style="color: #6b7280;">Збігів не знайдено.</p>'}
                    </div>
                </div>
            </body>
        </html>
        `;
};
