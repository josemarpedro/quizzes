import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, GetUserUseCase],
})
export class UserModule {}

