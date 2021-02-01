const { config } = require('../config');
const { logger } = require('../utils/logger');
const { getHumanReadableResort } = require('../utils/getHumanReadableResort');

/**
 * There's a bug with Chromium with this speech api.  It cannot parse longer strings
 * It starts to fail around 200 characters.  I tried every approach listed
 * in this bug report but could not make it work.
 *
 * https://bugs.chromium.org/p/chromium/issues/detail?id=335907
 *
 * Really wanted it to finish with rip em and stick em boys and girls
 * but after debugging for way too long realized this whole feature is
 * really dumb and completely unecessary and let it be....
 */

const finishWithRobotVoice = async ({ page, resort, month, day }) => {
	await page.waitForSelector('.confirmed_reservation__logo');

	if (config.roboVoiceEnabled || !config.runHeadless) {
		const humanReadableResort = getHumanReadableResort({ resortCode: resort });
		await page.evaluate(async (humanReadableResort, month, day) => {
			const sentence = `
				You are going to ${humanReadableResort} on ${(parseInt(month) + 1)} ${day}.
				You will be floating the glades on champagne powder like a boss.
				It's going to be Chronicles of fucking Gnarnia out there.
			`;
			const utterance = new SpeechSynthesisUtterance(sentence);
			window.speechSynthesis.speak(utterance);
		}, humanReadableResort, month, day);
	}

	logger.debug('Reservation complete!  Look out for the conformation email!');
	return page.waitForTimeout(10000);
};

module.exports = {
	finishWithRobotVoice,
};
