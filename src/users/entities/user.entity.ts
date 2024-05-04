import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { clients } from "../../clients/entities/client.entity";

@Entity('users')
export class users {
    @PrimaryGeneratedColumn('uuid') 
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

    @OneToMany(() => clients, client => client.userId)
    clients: clients[];
}
