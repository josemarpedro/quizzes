import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

