import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/repository';
import { User } from '../schema/user.schema';
import { UserSearchCriteria } from '../interfaces/user-search-criteria.interface';
import * as bcryptjs from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import { LoginResponseDto } from '../dto/responses/login-response.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(payload: CreateUserDto): Promise<UserResponseDto> {
    payload.password = await bcryptjs.hash(payload.password, 10);
    const data: User = {
      ...payload,
      isVerified: false,
    };
    const user = await this.userRepository.create(data);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getOneUserBy(searchCriteria: UserSearchCriteria): Promise<User | null> {
    return await this.userRepository.findOneBy(searchCriteria);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email }, false);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async loginUser(user: User): Promise<LoginResponseDto> {
    const accessToken = this.jwtService.sign({ userId: user._id });
    return {
      user: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
      accessToken,
    };
  }
}
