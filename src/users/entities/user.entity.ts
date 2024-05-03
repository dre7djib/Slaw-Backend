import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class users {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    generateCustomId() {
      this.userId = uuidv4();
    }

}