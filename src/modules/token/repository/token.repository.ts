import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TOKEN_COLLECTION_NAME, TokenDocument } from '../schema/token.schema';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TOKEN_COLLECTION_NAME)
    private tokenModel: Model<TokenDocument>,
  ) {}

  async create(data: any): Promise<any> {
    const documentRef = await this.tokenModel.create(data);

    return documentRef;
  }

  async findAndCount(filter: any): Promise<number> {
    return await this.tokenModel.countDocuments(filter);
  }

  async findOneAggregate(pipeline: any): Promise<any> {
    return await this.tokenModel.aggregate(pipeline);
  }

  async findOneAndUpdate(filter: any, update: any): Promise<any> {
    return await this.tokenModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
}
