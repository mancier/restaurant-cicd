FROM node:13-alpine
WORKDIR /root/app
COPY dist .
COPY package.json .
COPY yarn.lock .
COPY .env .
RUN yarn install --prefer-offline --freeze-lockfile --quiet --emoji