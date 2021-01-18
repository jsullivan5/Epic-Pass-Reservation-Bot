const { resortMap } = require('./resortMap');

/**
 * Twilio vars should only be set if you have a
 * Twilio account and would like to receive a text
 * upon a successful reservation.
 * @param twilioAccountSid Twilio account SID
 * @param twilioAuthToken Twilio auth token
 * @param twilioSendFromNum Your Twilio number <+1555222333>
 * @param twilioYourNotificationNum Yopur phone number <+1555222333>
 */

const config = {
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	resort: resortMap[process.env.RESORT],
	month: process.env.MONTH,
	day: process.env.DAY,
	twilioAccountSid: '', // Add these vars to use twilio feature from your account
	twilioAuthToken: '',
	twilioSendFromNum: '',
	twilioYourNotificationNum: ''
};

module.exports = {
	config,
};
