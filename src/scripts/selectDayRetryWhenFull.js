const { logger } = require('../utils/logger');

const selectDayRetryWhenFull = async ({ page, day, timeout }) => {
	await page.waitForSelector('.passholder_reservations__calendar__day');
	const btnXpath = `//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[1]/div[2]/div[2]/div/div[4]/button[${day}]`;
	const isDisabled = (await page.$x(`${btnXpath}[@disabled]`)).length !== 0;

	if (isDisabled) {
		logger.debug(`Day is full. Running again after ${timeout / 1000 / 60} minutes`);
		await page.waitForTimeout(timeout);
		await selectDayRetryWhenFull({ page, timeout });
	}

	logger.debug('Selecting calendar day');
	const [calendarDayBtn] = (await page.$x(btnXpath));
	return calendarDayBtn.click();
};

module.exports = {
	selectDayRetryWhenFull,
};