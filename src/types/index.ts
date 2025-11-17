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

export type UserRole = 'user' | 'premium' | 'admin';

export type User = {
  uid: string;
  email: string;
  loginName?: string;
  lastName?: string;
  userName?: string;
  avatar?: string;
  role?: UserRole;
  checkedTexts?: string[]; // Масив ID текстів, які користувач перевіряв
}
