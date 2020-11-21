import sgMail from '@sendgrid/mail';
import { SEND_GRID_API_KEY } from '../config';
import { mailtemp } from './mailtemplate';
export async function sendMessage(to: string, data): Promise<void> {
	sgMail.setApiKey(SEND_GRID_API_KEY);
	const msg = {
		to, // Change to your recipient
		from: 'akuagwuphilemon2019@gmail.com', // Change to your verified sender
		subject: 'Sent SMS',
		text: `Welcome to Twitee Application`,
		html: mailtemp(data),
	};

	return sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
}
