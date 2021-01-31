const { logger } = require("../utils/logger");

const login = async ({ page, username, password, delay }) => {
	// Login
	await page.click('#txtUserName_3');
	logger.debug('Typing username');
	await page.type('#txtUserName_3', username, { delay: 20 });

	await page.click('#txtPassword_3');
	logger.debug('Typing password');
	await page.type('#txtPassword_3', password, { delay: 20 });

	await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
	const [loginButton] = await page.$x('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
	logger.debug('Clicking login button');
	await loginButton.click();
	logger.debug('Logged in');
};

module.exports = {
	login,
};
