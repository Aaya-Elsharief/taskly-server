import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/repository';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(payload: CreateUserDto) {
    const result = { data: null, error: null };
    const data: User = payload;
    result.data = await this.userRepository.create(data);
    return result.data;
  }

  // // getOneUser
  // async getOneUser() {
  //   const result = { data: null, error: null };

  //   result.data = await this.userReposiory.getOne();
  //   return result.data;
  // }
}
