import { createConnection, getConnectionOptions } from 'typeorm';
import { UserModel } from '../models/users.model';
import { Email } from '../models/email.model';
import { __prod__ } from '../config';

export async function connect() {
	const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
	return process.env.NODE_ENV === 'production'
		? createConnection({
				...connectionOptions,
				url: process.env.DATABASE_URL,
				entities: [UserModel, Email],
				name: 'default',
		  } as any)
		: createConnection({
				...connectionOptions,
				name: 'default',
				entities: [UserModel, Email],
		  });
}
export async function database() {
	let retries = 10;
	while (retries) {
		try {
			await connect();
			console.log('Database connected');
			break;
		} catch (err) {
			console.log(err);
			retries -= 1;
			console.log(`retries left: ${retries}`);
			// wait 5 seconds
			await new Promise((res) => setTimeout(res, 5000));
		}
	}
}

// export const createTypeormConn = async () => {
// 	const connect
// };
