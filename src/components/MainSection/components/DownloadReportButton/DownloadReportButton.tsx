import React from "react";
import { Download } from "lucide-react";

import { StyledDownloadReportButton } from "./styled.tsx";

type DownloadReportButtonPropsType = {
  handleDownload: () => void;
};

export const DownloadReportButton = ({ handleDownload }: DownloadReportButtonPropsType) => {
  return (
    <StyledDownloadReportButton
      onClick={handleDownload}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = "#f9fafb";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.background = "white";
      }}
    >
      <Download size={18} />
      Завантажити звіт
    </StyledDownloadReportButton>
  );
};
