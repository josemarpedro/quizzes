import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetQuizzesUseCase } from '../../application/use-cases/get-quizzes.usecase';
import {
  AnswerQuizInput,
  AnswerQuizUseCase,
} from '../../application/use-cases/answer-quiz.usecase';

class AnswerQuizDto {
  userId!: string;
  answer!: string;
}

@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly getQuizzes: GetQuizzesUseCase,
    private readonly answerQuiz: AnswerQuizUseCase,
  ) {}

  @Get()
  async list() {
    return this.getQuizzes.execute();
  }

  @Post(':id/answer')
  async answer(@Param('id') id: string, @Body() body: AnswerQuizDto) {
    const payload: AnswerQuizInput = {
      userId: body.userId,
      quizId: id,
      answer: body.answer,
    };
    return this.answerQuiz.execute(payload);
  }
}

