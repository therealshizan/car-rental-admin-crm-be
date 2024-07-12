import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

// ------------------------------------------------------------------------

@Schema()
export class Users extends Document {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  company_name: string;

  @Prop()
  age: number;

  @Prop()
  in_business_since: number;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  is_subscription_active: boolean;

  @Prop()
  plan: string;

  @Prop()
  is_onlline: boolean;

  @Prop()
  last_login: number;

  @Prop()
  created_at: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
