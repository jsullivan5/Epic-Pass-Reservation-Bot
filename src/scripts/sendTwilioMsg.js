const { twilioService } = require('../services/twilio.service');
const { config } = require('../config');

const sendTwilioMsg = async ({ resort, month, day }) => {
	if (
		config.twilioAccountSid &&
		config.twilioAuthToken &&
		config.twilioSendFromNum &&
		config.myPhoneNumber
	) {
		await twilioService(resort, month, day);
	}
};

module.exports = {
	sendTwilioMsg,
};
