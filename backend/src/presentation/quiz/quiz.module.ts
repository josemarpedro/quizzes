import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { GetQuizzesUseCase } from '../../application/use-cases/get-quizzes.usecase';
import { AnswerQuizUseCase } from '../../application/use-cases/answer-quiz.usecase';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  controllers: [QuizController],
  providers: [PrismaService, GetQuizzesUseCase, AnswerQuizUseCase],
})
export class QuizModule {}

