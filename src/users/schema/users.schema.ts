import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ required: false })
    photo: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);