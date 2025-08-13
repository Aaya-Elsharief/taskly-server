import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { InternalServerErrorException } from 'src/utils/exception/internal-server-error-exception';
import { ErrorCodes } from 'src/utils/constants/error-codes';
import { UserSearchCriteria } from '../interfaces/user-search-criteria.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_COLLECTION_NAME) private userModel: Model<User>,
  ) {}

  async create(data: User, projectSensitiveFields = true): Promise<User> {
    try {
      const documentRef = await this.userModel.create(data);

      if (projectSensitiveFields) {
        if (documentRef['_doc'].password) delete documentRef['_doc'].password;
      }
      return documentRef;
    } catch (error) {
      throw new InternalServerErrorException(ErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneBy(
    searchCriteria: UserSearchCriteria,
    projectSensitiveFields = true,
  ): Promise<User> {
    try {
      let query = this.userModel.findOne(searchCriteria);

      if (projectSensitiveFields) {
        query = query.select('-password');
      }

      return await query.exec();
    } catch (error) {
      throw new InternalServerErrorException(ErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
