import {
	CreateDateColumn,
	Entity,
	Column,
	ManyToOne,
	JoinTable,
	PrimaryGeneratedColumn,
	BaseEntity,
} from 'typeorm';
import { UserModel } from './users.model';

@Entity()
export class Email extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	message: string;

	@Column()
	destinations: string;

	@Column()
	sender: string;

	@Column()
	creatorId: number;

	@ManyToOne(() => UserModel, (creator) => creator.emails)
	@JoinTable()
	creator: UserModel;

	@CreateDateColumn()
	createdAt: Date;
}
