import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {

  constructor(
    private readonly quizService: QuizService
  ) {}

  // ✅ Buscar todos os quizzes
  @Get()
  async getQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  // ✅ Responder a um quiz
  @Post(':id/answer')
  async answerQuiz(
    @Param('id') id: string,
    @Body() body: { userId: string; answer: string }
  ) {
    return this.quizService.answerQuiz(
      id,
      body.userId,
      body.answer
    );
  }
}