import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class users {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ default: true })
    isActive: boolean;
}