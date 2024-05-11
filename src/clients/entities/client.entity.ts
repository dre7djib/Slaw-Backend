import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { users } from "../../users/entities/user.entity";

@Entity('clients')
export class clients {
    @PrimaryGeneratedColumn('uuid')
    clientId: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    phone_number: string;

    @ManyToOne(() => users, user => user.clients, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    userId: users;
}