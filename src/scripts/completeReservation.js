const { logger } = require('../utils/logger');

const completeReservation = async ({ page }) => {
	await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[3]/button');
	const [completeResBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[3]/button');
	logger.debug('Completing reservation');
	completeResBtn.click();
	logger.debug('GET READY TO SHRED!!!');
};

module.exports = {
	completeReservation
};
