import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SuccessResponse } from 'src/utils/responses/success-response';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import { LoginResponseDto } from '../dto/responses/login-response.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDto,
    description: 'Create a new user',
  })
  @ApiOkResponse({
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<SuccessResponse> {
    const response = await this.userService.create(createUserDto);
    return new SuccessResponse(response);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'yourpassword' },
      },
      required: ['email', 'password'],
    },
    description: 'Login user with email and password',
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or user not verified',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any): Promise<SuccessResponse<LoginResponseDto>> {
    const response = await this.userService.loginUser(req.user);

    return new SuccessResponse(response);
  }
}
