import {
  StyledProgressBar,
  StyledProgressBarProgress,
  StyledProgressBarText,
  StyledProgressBarWrapper,
} from "./styled.tsx";

type AntiPlagiumProgressBarPropsType = {
  progress: number;
  currentStageText: string;
};

export const ProgressBar = ({ progress, currentStageText }: AntiPlagiumProgressBarPropsType) => {
  return (
    <StyledProgressBar>
      <StyledProgressBarWrapper>
        <StyledProgressBarProgress style={{ width: `${progress}%` }} />
      </StyledProgressBarWrapper>
      <StyledProgressBarText>
        {currentStageText} {progress}%
      </StyledProgressBarText>
    </StyledProgressBar>
  );
};
