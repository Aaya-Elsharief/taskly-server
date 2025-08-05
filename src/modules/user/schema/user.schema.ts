import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export const USER_COLLECTION_NAME = 'user';

/* user schema*/
export type UserDocument = User & Document;

@Schema({
  collection: USER_COLLECTION_NAME,
  autoIndex: true,
  timestamps: true,
})
export class User {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  mobileNumber: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
