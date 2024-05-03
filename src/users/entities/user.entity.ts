import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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
      // Générer un ID basé sur la date au format YYYYMMDDHHMMSSmmm
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}${currentDate.getMilliseconds().toString().padStart(3, '0')}`;
      this.userId = formattedDate;
    }

}