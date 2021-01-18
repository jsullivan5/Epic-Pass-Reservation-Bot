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
// const mont = 'add a month like <2> for February'
// const day = 'what day you want to go like <27>';

const {
	username,
	password,
	resort,
	month,
	day,
} = config;

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
		console.log('Accepted cookie policy\n');
		// Login
		await page.click('#txtUserName_3');
		console.log('Typing username\n');
		await page.type('#txtUserName_3', username, { delay: 20 });

		await page.click('#txtPassword_3');
		console.log('Typing password\n');
		await page.type('#txtPassword_3', password, { delay: 20 });

		await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
		const [loginButton] = await page.$x('/html/body/div[3]/div/div/div[2]/div/div/div[1]/form/div/div/div[5]/button');
		console.log('Clicking login button');
		await loginButton.click();
		console.log('Logged in\n');
		await page.waitForNavigation();

		const resortSelection = await page.waitForSelector('#PassHolderReservationComponent_Resort_Selection');
		console.log('Selecting a resort\n');
		await resortSelection.select('#PassHolderReservationComponent_Resort_Selection', resort);

		await page.click('#passHolderReservationsSearchButton');
		await page.waitForSelector('.passholder_reservations__calendar__day');
		const [calendarDay] = await page.$x(`//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[1]/div[2]/div[2]/div/div[4]/button[${day}]`);
		console.log('Selecting calendar day\n');
		await calendarDay.click();

		const passholderCheckbox = await page.waitForSelector('.passholder_reservations__assign_passholder_modal__name');
		console.log('Selecting passholder\n');
		passholderCheckbox.click();

		await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[3]/button[2]');
		const [assignPassholderBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[3]/button[2]');
		console.log('Assigning passholder\n');
		await assignPassholderBtn.click();

		await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[2]/div[2]/div[2]/label/span');
		const [termsAdnConditionsBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[2]/div[2]/div[2]/label/span');
		console.log('Consenting to shredc');
		await termsAdnConditionsBtn.click();

		await page.waitForXPath('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[3]/button');
		const [completeResBtn] = await page.$x('//*[@id="passHolderReservations__wrapper"]/div[3]/div[2]/div[6]/div[3]/button');
		console.log('Completing reservation\n');
		completeResBtn.click();
		console.log('GET READY TO SHRED!!!\n');

		if (config.twilioAccountSid && config.twilioAuthToken) {
			await twilioService(resort, month, day);
		}

		await page.setDefaultNavigationTimeout(0);
		page.waitForNavigation()
			.then(() => {})
			.catch((e) => {}); // catching useless error

		await browser.close();
	} catch (error) {
		console.error('¯\\_(ツ)_/¯\n\n\n');
		console.error(error);
		process.exit();
	}
})();
