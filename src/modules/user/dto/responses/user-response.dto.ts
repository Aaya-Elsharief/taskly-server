import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '507f1f77bcf86cd799439011',
  })
  _id: Types.ObjectId;

  @Expose()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @Expose()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @Expose()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@gmail.com',
    type: String,
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The mobile number of the user',
    example: '1-555-1234567',
    type: String,
  })
  mobileNumber: string;

  @Expose()
  @ApiProperty({
    description: 'The created date of the user',
    example: '2023-01-01T00:00:00Z',
    type: Date,
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The last updated date of the user',
    example: '2023-01-02T00:00:00Z',
    type: Date,
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Indicates whether the user is verified',
    example: true,
    type: Boolean,
  })
  isVerified: boolean;

  @Exclude()
  password?: string;
}
