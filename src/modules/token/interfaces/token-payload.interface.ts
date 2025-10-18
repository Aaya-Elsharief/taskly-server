import { Types } from 'mongoose';
import { SourceEnum } from '../constants/token.enum';

export interface CreateTokenInterface {
  userId: Types.ObjectId;
  deviceSource: SourceEnum;
}
