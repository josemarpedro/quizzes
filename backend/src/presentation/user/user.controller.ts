import { Controller, Get, Param } from '@nestjs/common';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly getUser: GetUserUseCase) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUser.execute(id);
  }
}

