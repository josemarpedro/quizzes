import { Module } from '@nestjs/common';
import { QuizModule } from './presentation/quiz/quiz.module';
import { UserModule } from './presentation/user/user.module';

@Module({
  imports: [QuizModule, UserModule],
})
export class AppModule {}
