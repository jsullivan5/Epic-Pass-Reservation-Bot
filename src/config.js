const { resortMap } = require('./resortMap');

/**
 * Twilio vars should only be set if you have a
 * Twilio account and would like to receive a text
 * upon a successful reservation.
 * @param twilioAccountSid Twilio account SID
 * @param twilioAuthToken Twilio auth token
 * @param twilioSendFromNum Your Twilio number <+15552223333>
 * @param myPhoneNumber Your phone number <+15552223333>
 */

const config = {
	initialUrl: 'https://www.epicpass.com/account/login.aspx?url=%2fplan-your-trip%2flift-access%2freservations.aspx%3freservation%3dtrue',
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	resort: resortMap[process.env.RESORT],
	month: process.env.MONTH,
	day: process.env.DAY,
	runHeadless: process.env.RUN_HEADLESS || false,
	devtools: process.env.DEVTOOLS || false,
	roboVoiceEnbled: true, // Why would to toggle this????
	// Add these vars to the .env file if you want to enable this feature
	twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || null,
	twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || null,
	twilioSendFromNum: process.env.TWILIO_SEND_FROM || null,
	myPhoneNumber: process.env.MY_PHONE_NUMBER || null,
};

module.exports = {
	config,
};
