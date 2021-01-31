const { config } = require('./config');
const { resortMap } = require('./resortMap');
const { logger } = require('./utils/logger');
const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;

const twilioService = async (resortCode, month, day) => {
	const client = require('twilio')(accountSid, authToken);
	const humanReadableResort = Object.keys(resortMap).reduce((accu, key) => {
		if (resortMap[key] === `${resortCode}`) {
			accu = key;
			return accu;
		}
		return accu;
	}, '');
	logger.debug(
		'Sending MMS with config:\n',
		`Resort: ${humanReadableResort}\n`,
		`Month: ${month}\n`,
		`Day: ${day}\n`,
	);
	return client.messages
		.create({
			body: `Sick Brah!  You're heading to ${humanReadableResort} on ${month + 1}/${day}. 🤙🤙🤙`,
			from: config.twilioSendFromNum,
			mediaUrl: ['https://media.giphy.com/media/3oKIPs6VsHLpVXnZTy/giphy-downsized.gif'], // Non congigurable non negotiable...
			to: config.myPhoneNumber
		})
		.then(message => logger.debug(`Sending MMS: ${message.sid}`));
};

module.exports = {
	twilioService,
};
