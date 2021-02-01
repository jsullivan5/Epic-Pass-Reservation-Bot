const { logger } = require('../utils/logger');

const grantUserConsent = async ({ page }) => {
	const passholderCheckbox = await page.waitForSelector('.passholder_reservations__assign_passholder_modal__name');
	logger.debug('Selecting passholder');
	passholderCheckbox.click();

	await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[3]/button[2]');
	const [assignPassholderBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[3]/button[2]');
	logger.debug('Assigning passholder');
	await assignPassholderBtn.click();

	await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[2]/div[2]/div[2]/label/span');
	const [termsAdnConditionsBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[2]/div[2]/div[2]/label/span');
	logger.debug('Consenting to shred');
	return termsAdnConditionsBtn.click();
};

module.exports = {
	grantUserConsent,
};
