const { config } = require('./config');
const { resortMap } = require('./resortMap');
const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;

const client = require('twilio')(accountSid, authToken);

const twilioService = async (resortCode, month, day) => {
	const humanReadableResort = Object.keys(resortMap).reduce((accu, key) => {
		if (resortMap[key] === `${resortCode}`) {
			accu = key;
			return accu;
		}
		return accu;
	}, '');
	console.log(
		'Sending MMS with config:\n',
		`Resort: ${humanReadableResort}\n`,
		`Month: ${month}\n`,
		`Day: ${day}\n`,
	);
	return client.messages
		.create({
			body: `Sick Brah!  You're heading to ${humanReadableResort} on ${month}/${day}. 🤙🤙🤙`,
			from: config.twilioSendFromNum,
			mediaUrl: ['https://media.giphy.com/media/3oKIPs6VsHLpVXnZTy/giphy-downsized.gif'], // Non congigurable non negotiable...
			to: config.twilioYourNotificationNum
		})
		.then(message => console.log(`Sending MMS: ${message.sid}`));
};

module.exports = {
	twilioService,
};
