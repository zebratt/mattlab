FROM node:latest

WORKDIR /app/mock-data-server

COPY package.json yarn.lock ./

RUN yarn install --production=false

COPY . ./
RUN yarn build

ENV PORT=8080
EXPOSE ${PORT}

CMD ["yarn", "start"]
