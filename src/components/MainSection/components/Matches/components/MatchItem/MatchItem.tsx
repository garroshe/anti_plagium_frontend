import React from "react";

import {
  StyledMatchItem,
  StyledMatchItemSimilarity,
  StyledMatchItemSnippet,
  StyledMatchItemTitle,
  StyledMatchItemWrapper,
} from "./styled.tsx";

type MatchItemPropsType = {
  index: number;
  match: {
    url: string;
    title: string;
    snippet: string;
    similarity: number;
    matchedPhrases: string[];
  };
};

export const MatchItem = ({ index, match }: MatchItemPropsType) => {
  return (
    <StyledMatchItem
      key={index}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.borderColor = "#667eea";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
    >
      <StyledMatchItemWrapper>
        <StyledMatchItemTitle href={match.url} target="_blank" rel="noopener noreferrer">
          {match.title}
        </StyledMatchItemTitle>
        <StyledMatchItemSimilarity>{match.similarity}% схожості</StyledMatchItemSimilarity>
      </StyledMatchItemWrapper>
      <StyledMatchItemSnippet>{match.snippet}</StyledMatchItemSnippet>
    </StyledMatchItem>
  );
};
