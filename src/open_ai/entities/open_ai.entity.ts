import { users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('open_ai')
export class open_ai {
    @PrimaryGeneratedColumn('uuid')
    messageId: string;

    @ManyToOne(() => users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    userId: users;

    @Column('text')
    message: string;

    @Column('text')
    response: string;

    @Column()
    created_at: Date;
}
