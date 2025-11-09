import { AlertCircle } from "lucide-react";

import type { PlagiarismResult } from "../../../../type";
import { MatchItem } from "./components/MatchItem/MatchItem.tsx";
import { StyledMatchesTitle, StyledMatchesWrapper } from "./styled.tsx";

export const Matches = ({ result }: { result: PlagiarismResult | null }) => {
  if (!result || !result.checkedResults?.length) {
    return (
      <StyledMatchesTitle>
        <AlertCircle size={24} color="#f59e0b" />
        Збігів не знайдено
      </StyledMatchesTitle>
    );
  }

  const totalMatches = result.checkedResults.reduce((acc, r) => acc + (r.matches?.length || 0), 0);

  if (totalMatches === 0) {
    return (
      <StyledMatchesTitle>
        <AlertCircle size={24} color="#f59e0b" />
        Збігів не знайдено
      </StyledMatchesTitle>
    );
  }

  return (
    <>
      <StyledMatchesTitle>
        <AlertCircle size={24} color="#f59e0b" />
        Знайдені збіги ({totalMatches})
      </StyledMatchesTitle>

      <StyledMatchesWrapper>
        {result.checkedResults
          .slice(0, 15)
          .map((item, idx) =>
            item.matches?.map((match, i) => <MatchItem key={`${idx}-${i}`} index={i} match={match} />),
          )}
      </StyledMatchesWrapper>
    </>
  );
};
