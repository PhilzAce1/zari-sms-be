import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, SendMessageDtoo } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import { UserModel as userModel } from '../models/users.model';
import { Email } from '../models/email.model';
import { isEmptyObject } from '../utils/util';
import { sendMessage } from '../utils/sendMail';
import { JWT_SECRET, __prod__ } from '../config';
class AuthService {
	public users = userModel;
	private email = Email;
	public async signup(
		userData: CreateUserDto
	): Promise<{ findUser: User; token: string }> {
		if (isEmptyObject(userData))
			throw new HttpException(400, "You're not userData");

		const findUser = await this.users.findOne({
			where: { email: userData.email },
		});
		if (findUser)
			throw new HttpException(
				400,
				`You're email ${userData.email} already exists`
			);

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const createUserData: User = {
			email: userData.email,
			password: hashedPassword,
			name: userData.name,
		};
		const res = await this.users.create(createUserData).save();
		const tokenData = this.createToken(res);

		return { findUser: res, token: tokenData.token };
	}

	public async login(
		userData: CreateUserDto
	): Promise<{ findUser: User; token: string }> {
		if (isEmptyObject(userData))
			throw new HttpException(400, "You're not userData");

		const findUser = await this.users.findOne({
			where: { email: userData.email },
		});
		if (!findUser)
			throw new HttpException(409, `You're email ${userData.email} not found`);

		const isPasswordMatching: boolean = await bcrypt.compare(
			userData.password,
			findUser.password
		);
		if (!isPasswordMatching) throw new HttpException(409, 'wrong password ');

		const tokenData = this.createToken(findUser);

		findUser.password = '';

		return { findUser, token: tokenData.token };
	}

	public async sendMessage(userData: SendMessageDtoo) {
		const { destinations, id, message, sender } = userData;
		await this.email
			.create({
				destinations,
				message,
				sender,
				creatorId: id,
			})
			.save();
		await sendMessage('akuagwuphilemon11@gmail.com', userData);
		return true;
	}
	public createToken(user: User): TokenData {
		const dataStoredInToken: DataStoredInToken = { id: user.id };
		const secret: string = JWT_SECRET;
		const expiresIn: number = 60 * 60 * 24 * 3; // 3 days;

		return {
			expiresIn,
			token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
		};
	}
}

export default AuthService;
