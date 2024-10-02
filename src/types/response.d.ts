export interface TokenResponse {
  token: string;
  expires: Date;
}

export interface AuthTokensResponse {
  token: string;
}

export const QuestionStatus = {
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
  INCOMPLETE: 'INCOMPLETE',
  REJECTED: 'REJECTED'
} as const;

export type QuestionStatus = typeof QuestionStatus[keyof typeof QuestionStatus];

export const UserRoles = {
  MANAGER: 'MANAGER',
  QUIZ_CREATOR: 'QUIZ_CREATOR',
  MODERATOR: 'MODERATOR',
  SINHALA_TRANSLATOR: 'SINHALA_TRANSLATOR',
  SINHALA_TRANSLATOR_CHECKER: 'SINHALA_TRANSLATOR_CHECKER',
  TAMIL_TRANSLATOR: 'TAMIL_TRANSLATOR',
  TAMIL_TRANSLATOR_CHECKER: 'TAMIL_TRANSLATOR_CHECKER',
  ILLUSTRATOR: 'ILLUSTRATOR'
} as const;

export type UserRoles = typeof UserRoles[keyof typeof UserRoles];
