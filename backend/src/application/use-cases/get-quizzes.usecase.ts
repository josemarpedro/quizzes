import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { QuizEntity } from '../../domain/entities/quiz.entity';

@Injectable()
export class GetQuizzesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<QuizEntity[]> {
    const quizzes = await this.prisma.quiz.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return quizzes;
  }
}

