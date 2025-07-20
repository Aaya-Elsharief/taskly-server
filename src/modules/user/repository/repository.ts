import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, User } from '../schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_COLLECTION_NAME) private userModel: Model<User>,
  ) {}

  async create(data: User) {
    const documentRef = await this.userModel.create(data);
    return documentRef;
  }
}
