const puppeteer = require('puppeteer');

const { twilioService } = require('./twilio.service');
const { config } = require('./config');

/**
 * Comment out the references to config and
 * manully add the inputs below in plain text
 * to run as a node process without the CLI
 */

// const username = '<yourloginemail@example.com>';
// const password = '<yourpassword>';
// const resort = 'where you want to go';
// const month = 'add a month like <2> for February'
// const day = 'what day you want to go like <27>';

const {
	username,
	password,
	resort,
	month,
	day,
} = config; // Driven by CLI environment variables

const getDate = ({ chosenMonth }) => {
	const todaysDate = new Date();
	const currentMonth = todaysDate.getMonth();
	const monthIncrementNum = chosenMonth - currentMonth;

	if (monthIncrementNum < 0) {
		throw new Error('Month cannot be in the past');
	}

	return monthIncrementNum;
};

const monthIncrementNum = getDate({ chosenMonth: month });

const retryWhenDayFull = async ({ timeout, page }) => { // timout for 5 minutes = 300000
	await page.waitForSelector('.passholder_reservations__calendar__day');
	const btnXpath = `//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[1]/div[2]/div[2]/div/div[4]/button[${day}]`;
	const isDisabled = (await page.$x(`${btnXpath}[@disabled]`)).length !== 0;

	if (isDisabled) {
		console.log(`Day is full. Running again after ${timeout / 1000 / 60} minutes`);
		await page.waitForTimeout(timeout);
		await retryWhenDayFull({ timeout, page });
	}

	console.log('Selecting calendar day');
	const [calendarDayBtn] = (await page.$x(btnXpath));
	return calendarDayBtn.click();
};

console.log(
	'Running bot with the following inputs:\n',
	`username: ${username}\n`,
	'password: ***\n',
	`resort: ${resort}\n`,
	`month: ${month}\n`,
	`day: ${day}\n`
);

(async () => {
	// Setup
	try {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 75,
			// devtools: true
		});
		const page = await browser.newPage();

		// Navigate to reservation page
		await page.goto('https://www.epicpass.com/account/login.aspx?url=%2fplan-your-trip%2flift-access%2freservations.aspx%3freservation%3dtrue');

		await page.waitForXPath('//*[@id="onetrust-accept-btn-handler"]');
		const [cookieBtn] = await page.$x('//*[@id="onetrust-accept-btn-handler"]');
		await cookieBtn.click();
		console.log('Accepted cookie policy');
		// Login
		await page.click('#txtUserName_3');
		console.log('Typing username');
		await page.type('#txtUserName_3', username, { delay: 20 });

		await page.click('#txtPassword_3');
		console.log('Typing password');
		await page.type('#txtPassword_3', password, { delay: 20 });

		await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
		const [loginButton] = await page.$x('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
		console.log('Clicking login button');
		await loginButton.click();
		console.log('Logged in');
		await page.waitForNavigation();

		const resortSelection = await page.waitForSelector('#PassHolderReservationComponent_Resort_Selection');
		console.log('Selecting a resort');
		await resortSelection.select('#PassHolderReservationComponent_Resort_Selection', resort);

		console.log('Selecting month');

		await page.click('#passHolderReservationsSearchButton');
		await page.waitForSelector('.passholder_reservations__calendar__day');

		if (monthIncrementNum !== 0) {
			for (let i = 0; i < monthIncrementNum; i++) {
				await page.waitForSelector('.passholder_reservations__calendar__arrow--right');
				await page.click('.passholder_reservations__calendar__arrow--right');
			}
		}

		await retryWhenDayFull({ timeout: 300000, page }); // Recursively retries every 5 minutes

		const passholderCheckbox = await page.waitForSelector('.passholder_reservations__assign_passholder_modal__name');
		console.log('Selecting passholder');
		passholderCheckbox.click();

		await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[3]/button[2]');
		const [assignPassholderBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[3]/button[2]');
		console.log('Assigning passholder');
		await assignPassholderBtn.click();

		await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[2]/div[2]/div[2]/label/span');
		const [termsAdnConditionsBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[2]/div[2]/div[2]/label/span');
		console.log('Consenting to shred');
		await termsAdnConditionsBtn.click();

		await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[3]/button');
		const [completeResBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[3]/button');
		console.log('Completing reservation');
		completeResBtn.click();
		console.log('GET READY TO SHRED!!!');

		if (config.twilioAccountSid && config.twilioAuthToken) {
			await twilioService(resort, month, day);
		}

		await page.waitForSelector('.confirmed_reservation__logo');
		await page.waitForTimeout(10000);

		await browser.close();
	} catch (error) {
		console.error('¯\\_(ツ)_/¯\n\n\n');
		console.error(error);
		process.exit();
	}
})();
