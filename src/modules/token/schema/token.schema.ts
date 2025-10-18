import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SourceEnum } from '../constants/token.enum';
import { USER_COLLECTION_NAME } from 'src/modules/user/schema/user.schema';

export const TOKEN_COLLECTION_NAME = 'token';
export type TokenDocument = Token & Document;

@Schema({
  autoIndex: true,
  collection: TOKEN_COLLECTION_NAME,
  timestamps: true,
})
export class Token {
  _id?: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: `${USER_COLLECTION_NAME}`,
  })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  refreshToken: string;

  @Prop({ type: String, required: true, enum: SourceEnum })
  deviceSource: SourceEnum;

  @Prop({ type: Date, required: true })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
