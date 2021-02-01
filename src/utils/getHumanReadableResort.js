const { resortMap } = require('../resortMap');

const getHumanReadableResort = ({ resortCode }) => {
	return Object.keys(resortMap).reduce((accu, key) => {
		if (resortMap[key] === `${resortCode}`) {
			accu = key;
			return accu;
		}
		return accu;
	}, '');
};

module.exports = {
	getHumanReadableResort,
};
