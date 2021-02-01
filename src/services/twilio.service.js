const { getHumanReadableResort } = require('../utils/getHumanReadableResort');
const { config } = require('../config');
const { logger } = require('../utils/logger');

const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;

const twilioService = async (resortCode, month, day) => {
	const client = require('twilio')(accountSid, authToken);
	const humanReadableResort = getHumanReadableResort({ resortCode });
	logger.debug(
		'Sending MMS with config:\n',
		`Resort: ${humanReadableResort}\n`,
		`Month: ${month}\n`,
		`Day: ${day}\n`,
	);
	return client.messages
		.create({
			body: `Sick Brah!  You're heading to ${humanReadableResort} on ${(parseInt(month) + 1)}/${day}. 🤙🤙🤙`,
			from: config.twilioSendFromNum,
			mediaUrl: ['https://media.giphy.com/media/3oKIPs6VsHLpVXnZTy/giphy-downsized.gif'], // Non congigurable non negotiable...
			to: config.myPhoneNumber
		})
		.then(message => logger.debug(`Sending MMS: ${message.sid}`));
};

module.exports = {
	twilioService,
};
