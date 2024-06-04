import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThreadDocument = Document & Thread;

@Schema()
export class Thread {
    @Prop()
    userId: string;

    @Prop()
    threadId: string;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);