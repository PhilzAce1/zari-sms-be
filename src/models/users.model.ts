import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
	JoinTable,
} from 'typeorm';
import { User } from '../interfaces/users.interface';
import { Email } from './email.model';
@Entity()
export class UserModel extends BaseEntity implements User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	password: string;

	@OneToMany(() => Email, (emails) => emails.creator)
	@JoinTable()
	emails: Email[];

	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
