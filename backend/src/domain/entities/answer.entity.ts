export interface AnswerEntity {
  id: string;
  userId: string;
  quizId: string;
  userAnswer: string;
  isCorrect: boolean;
  xpDelta: number;
  createdAt: Date;
}

