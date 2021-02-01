require('dotenv').config();
const puppeteer = require('puppeteer');

const { config } = require('./config');
const { logger } = require('./utils/logger');

// Scripts for various tasks
const { login } = require('./scripts/login');
const { acceptCookies } = require('./scripts/acceptCookies');
const { selectResort } = require('./scripts/selectResort');
const { selectMonth } = require('./scripts/selectMonth');
const { grantUserConsent } = require('./scripts/userConsent');
const { selectDayRetryWhenFull } = require('./scripts/selectDayRetryWhenFull');
const { completeReservation } = require('./scripts/completeReservation');
const { sendTwilioMsg } = require('./scripts/sendTwilioMsg');
const { finishWithRobotVoice } = require('./scripts/finishWithRobotVoice');

/**
 * Comment out the references to config and
 * manully add the inputs below in plain text
 * to run as a node process without the CLI
 */

// const username = '<yourloginemail@example.com>';
// const password = '<yourpassword>';
// const resort = 'where you want to go';
// const month = 'add numeric value for month - 1.  Februrary (2) would be read by JS as <1>.';
// const day = 'what day you want to go like <27>';

const {
	username,
	password,
	resort,
	month,
	day,
} = config; // Driven by CLI environment variables

logger.debug(
	'Running bot with the following inputs:\n\n',
	`username: ${username}\n`,
	`password: ${password ? '***' : 'No password.  This is going to break...'}\n`,
	`resort: ${resort}\n`,
	`month: ${month}\n`,
	`day: ${day}\n`
);

(async () => {
	try {
		const browser = await puppeteer.launch({
			headless: config.runHeadless, // only false if you don't like watching magic browesers or in Docker
			slowMo: 75, // Slowed down to more closely resemble human beahvior and/or dramatic effect
			devtools: config.devtools,
		});
		const page = await browser.newPage();

		await page.goto(config.initialUrl);

		await acceptCookies({ page });
		await login({ page, username, password, delay: 20 });
		await selectResort({ page, resort });
		await selectMonth({ page, month });
		await selectDayRetryWhenFull({ page, day, timeout: 300000 }); // Recursively retries every 5 minutes
		await grantUserConsent({ page });
		await completeReservation({ page });
		await sendTwilioMsg({ resort, month, day });
		await finishWithRobotVoice({ page, resort, month, day });

		await browser.close();
		process.exit(0);
	} catch (error) {
		logger.error('\n\n\n¯\\_(ツ)_/¯\n\n\n');
		logger.error(error);
		process.exit(1);
	}
})();
