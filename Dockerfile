# TODO: This doesn't work yet
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker

FROM node:14.15.4-slim

ENV NODE_ENV=production
ENV RUN_HEADLESS=true

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y wget gnupg \
	&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
	--no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*


COPY package.json ./
RUN npm install --only-prod

COPY resort.list ./
COPY .env ./
COPY src ./src
COPY epic_cli.sh ./

RUN chmod +x epic_cli.sh

ENTRYPOINT [ "./epic_cli.sh" ]
