import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';

export interface AnswerQuizInput {
  userId: string;
  quizId: string;
  answer: string;
}

export interface AnswerQuizResult {
  correct: boolean;
  correctContinent: string;
  experience: number;
  xpDelta: number;
}

@Injectable()
export class AnswerQuizUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: AnswerQuizInput): Promise<AnswerQuizResult> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: input.quizId },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    let user = await this.prisma.user.findUnique({
      where: { id: input.userId },
    });

    if (!user) {
      // Simple default user creation for demo purposes
      user = await this.prisma.user.create({
        data: {
          id: input.userId,
          name: `Player ${input.userId}`,
        },
      });
    }

    const correct = input.answer.toLowerCase().trim() === quiz.correctContinent.toLowerCase().trim();
    const xpDelta = correct ? 50 : -15;

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        experience: {
          increment: xpDelta,
        },
      },
    });

    await this.prisma.answer.create({
      data: {
        userId: user.id,
        quizId: quiz.id,
        userAnswer: input.answer,
        isCorrect: correct,
        xpDelta,
      },
    });

    return {
      correct,
      correctContinent: quiz.correctContinent,
      experience: updatedUser.experience,
      xpDelta,
    };
  }
}

