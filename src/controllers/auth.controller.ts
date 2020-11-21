/* -------------------------- External Dependencies ------------------------- */
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';

/* -------------------------- Validators and Interfaces  ------------------------- */
import { CreateUserDto, SendMessageDtoo } from '../dtos/users.dto';
// import { User } from '../interfaces/users.interface';

/* -------------------------- Internal Dependencies ------------------------- */
import AuthService from '../services/auth.service';
class AuthController {
	public authService = new AuthService();
	public signUp = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;
		try {
			const { findUser, token } = await this.authService.signup(userData);
			// const { password, ...createdUser } = findUser;
			const resData = {
				email: findUser.email,
				token,
				id: findUser.id,
				name: findUser.name,
			};
			res.status(201).json({ payload: resData, success: true });
		} catch (error) {
			next(error);
		}
	};

	public logIn = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;

		try {
			const { findUser, token } = await this.authService.login(userData);
			const { password, ...loggedInUser } = findUser;
			const resData = {
				email: loggedInUser.email,
				token,
				name: loggedInUser.name,
				id: loggedInUser.id,
			};

			res.status(200).json({ payload: resData, success: true });
		} catch (error) {
			next(error);
		}
	};
	public sendMessage = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		if (req.user.id === undefined)
			throw new HttpException(409, 'You must be authenticated');

		const userData: SendMessageDtoo = req.body;
		const id = req.user.id;
		userData.id = id;
		const isMailSent = await this.authService.sendMessage(userData);

		if (!isMailSent) {
			throw new HttpException(400, 'Something went wrong ');
		}
		try {
			res.status(200).json({ payload: 'stuff', success: true });
		} catch (error) {
			next(error);
		}
	};
}

export default AuthController;
