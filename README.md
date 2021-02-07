# Epic-Pass-Reservation-Bot

___________      .__         __________        __   
\_   _____/_____ |__| ____   \______   \ _____/  |_ 
 |    __)_\____ \|  |/ ___\   |    |  _//  _ \   __\
 |        \  |_> >  \  \___   |    |   (  <_> )  |  
/_______  /   __/|__|\___  >  |______  /\____/|__|  
        \/|__|           \/          \/            

This app automates Epic Pass reservations for the 2020-2021 season.  No changes to the code are required to get started.  All  user data  is consumed from CLI prompts.  Retry logic attempts to book full days until sucessful.  It can be configured to send text messages with a Twilio account but not needed.  There's a lot of goofy stuff built in this.  Get ready to shred, `Brah`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

* Node.js version >14 - ([install node](https://nodejs.org/en/download/)) or use a your package manager of choice (e.g. Homebrew, Chocolatey, etc).

* NPM - Should come with any distribution of Node.js [Get NPM](https://www.npmjs.com/get-npm)

* Git - If you don't know what this is, just download the project files as a zip... [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

* Mac OS or Linux - Windows not currently supported.  Docker support for Windows coming soon or build it yourself ;)

### Installing

Follow these steps to setup this project

Clone the project
```bash
git clone git@github.com:jsullivan5/Epic-Pass-Reservation-Bot.git
```
or
```bash
Download the project as a zip file from this repository
```

Ensure you are using Node version 14

```bash
node -v
# output should be something like v14.15.4
```

Navigate to project folder
```bash
cd Epic-Pass-Reservation-Bot
```

Install project dependencies
```bash
npm install
```

Make sure CLI is executable
```bash
chmod +x epic_cli.sh
```

Run the CLI and get them rezzies
```bash
./epic_cli.sh
```

Follow the prompts to input your username, password, desired resort, month  and day.

Configuration for the app is in `src/config.js`.  You can change things like retry timeout or run headless.  It should be good to go with the default though, Bruh.

### Advanced Configuration

#### Enable Twilio Text Message Alerts on Completion

1. Sign up for a twilio account
2. Rename file `.env.sample` to `.env`
3. Add the necessary values to the `.env` file
4. Run the bot

This is a stupid and gratuitous feature and is not necessary for execution.  You should receive an email from Epic regardless but it's pretty funny...


### Code Style and Standards

Code style is enforced with [Eslint Standard](https://www.npmjs.com/package/eslint-config-standard)

## Built With

* [Node.js](https://nodejs.org/en/)
* [Puppeteer.js](https://pptr.dev/) - Browser automation
* [Twilio](https://www.twilio.com/) - Text message client (Not Required)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
