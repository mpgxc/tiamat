FROM node:14 as development

WORKDIR /app

COPY package.json  .

RUN yarn

COPY . .

RUN yarn prisma generate

FROM development as production

RUN yarn build

EXPOSE ${API_PORT}
