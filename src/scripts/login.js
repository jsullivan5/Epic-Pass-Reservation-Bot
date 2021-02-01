const { logger } = require('../utils/logger');

const login = async ({ page, username, password, delay }) => {
	await page.click('#txtUserName_3');
	logger.debug('Typing username');
	await page.type('#txtUserName_3', username, { delay });

	await page.click('#txtPassword_3');
	logger.debug('Typing password');
	await page.type('#txtPassword_3', password, { delay });

	await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
	const [loginButton] = await page.$x('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
	logger.debug('Clicking login button');
	await loginButton.click();

	logger.debug('Logged in');
	return page.waitForNavigation();
};

module.exports = {
	login,
};
