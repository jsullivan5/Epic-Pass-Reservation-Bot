const getMonthIncrementNum = ({ chosenMonth }) => {
	const todaysDate = new Date();
	const currentMonth = todaysDate.getMonth();
	const monthIncrementNum = chosenMonth - currentMonth;

	if (monthIncrementNum < 0) {
		throw new Error('Month cannot be in the past');
	}

	return monthIncrementNum;
};

module.exports = {
	getMonthIncrementNum,
};
