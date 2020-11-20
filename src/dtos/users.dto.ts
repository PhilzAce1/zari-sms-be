import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	public email: string;

	@IsString()
	public password: string;

	@IsString()
	public name: string;

	public userId?: number;
}

export class LoginUserDto {
	@IsEmail()
	public email: string;

	@IsString()
	public password: string;

	public userId?: number;
}
