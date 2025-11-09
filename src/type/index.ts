export type PlagiarismMatch = {
  url: string;
  title: string;
  snippet: string;
  similarity: number;
  matchedPhrases: string[];
};

export type CheckedResult = {
  sentence: string;
  found: boolean;
  matches: PlagiarismMatch[];
};

export type PlagiarismResult = {
  uniqueness: number;
  totalSentences: number;
  checkedResults: CheckedResult[];
  checkedAt: string;
};
