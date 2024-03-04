import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ default: true })
    isActive: boolean;
}