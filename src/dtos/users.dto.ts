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

export class SendMessageDtoo {
	@IsString()
	public message: string;

	@IsString()
	public destinations: string;
	@IsString()
	public sender: string;

	public id: number;
}
