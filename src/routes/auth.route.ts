import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import {
	CreateUserDto,
	LoginUserDto,
	SendMessageDtoo,
} from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`/signup`,
			validationMiddleware(CreateUserDto),
			this.authController.signUp
		);
		this.router.post(
			`/login`,
			validationMiddleware(LoginUserDto),
			this.authController.logIn
		);
		this.router.get('/me', authMiddleware, (req, res) => {
			const { password, ...user } = req.user;
			res.json({ success: true, payload: user });
		});
		this.router.post(
			'/sendmessage',
			validationMiddleware(SendMessageDtoo) as any,
			authMiddleware as any,
			this.authController.sendMessage as any
		);
	}
}

export default AuthRoute;
