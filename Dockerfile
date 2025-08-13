FROM node:13-alpine
WORKDIR /root/app
COPY . .
RUN yarn install --prefer-offline --freeze-lockfile --quiet --emoji
RUN yarn build