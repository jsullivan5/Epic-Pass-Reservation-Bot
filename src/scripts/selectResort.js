const { logger } = require('../utils/logger');

const selectResort = async ({ page, resort }) => {
	const resortSelection = await page.waitForSelector('#PassHolderReservationComponent_Resort_Selection');
	logger.debug('Selecting a resort');
	await resortSelection.select('#PassHolderReservationComponent_Resort_Selection', resort);
};

module.exports = {
	selectResort
};
