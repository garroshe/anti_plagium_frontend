export const REPORT_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background: #ffffff;
    padding: 40px 20px;
  }
  .container { max-width: 900px; margin: 0 auto; }

  .header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 2px solid #e5e7eb;
  }
  .header h1 { font-size: 32px; color: #111827; margin-bottom: 10px; }
  .header p { color: #6b7280; font-size: 14px; }

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
`;
