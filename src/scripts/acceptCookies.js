const { logger } = require('../utils/logger');

const acceptCookies = async ({ page }) => {
	await page.waitForXPath('//*[@id="onetrust-accept-btn-handler"]');
	const [cookieBtn] = await page.$x('//*[@id="onetrust-accept-btn-handler"]');
	await cookieBtn.click();
	return logger.debug('Accepted cookie policy');
};

module.exports = {
	acceptCookies,
};
