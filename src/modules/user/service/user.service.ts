import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/repository';
import { User } from '../schema/user.schema';
import { UserSearchCriteria } from '../interfaces/user-search-criteria.interface';
import { IServiceResponse } from 'src/utils/interfaces/service-response.interface';
import * as bcryptjs from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(payload: CreateUserDto): Promise<User> {
    // const result: IServiceResponse = { data: null, error: null };

    payload.password = bcryptjs.hashSync(payload.password, 10);
    const data: User = {
      ...payload,
      isVerified: false,
    };
    return await this.userRepository.create(data);
  }

  async getOneUserBy(searchCriteria: UserSearchCriteria): Promise<User> {
    return await this.userRepository.findOneBy(searchCriteria);
  }
}
