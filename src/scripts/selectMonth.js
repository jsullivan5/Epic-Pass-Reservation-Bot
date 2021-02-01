const { getMonthIncrementNum } = require('../utils/getMonthIncrementNum');
const { logger } = require('../utils/logger');

const selectMonth = async ({ page, month }) => {
	const monthIncrementNum = getMonthIncrementNum({ chosenMonth: month });

	await page.click('#passHolderReservationsSearchButton');
	await page.waitForSelector('.passholder_reservations__calendar__day');
	logger.debug('Selecting month');

	if (monthIncrementNum !== 0) {
		for (let i = 0; i < monthIncrementNum; i++) {
			await page.waitForSelector('.passholder_reservations__calendar__arrow--right');
			await page.click('.passholder_reservations__calendar__arrow--right');
		}
	}
};

module.exports = {
	selectMonth,
};
