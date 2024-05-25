import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThreadDocument = Document & Thread;

@Schema()
export class Thread {
    @Prop({ required: true })
    thread_id: string;

    @Prop({ required: true, autoIncrement: true })
    message_id: number;

    @Prop({ required: true, enum: ['user', 'assistant'] })
    role: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);