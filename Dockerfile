FROM mhart/alpine-node:14.2.0 as base
RUN apk update \
  && apk add curl python --no-cache --virtual build-dependencies build-base gcc \
  && npm i -g npm@latest

FROM base as dependencies
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i

FROM base as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules node_modules
COPY . .
RUN npm run compile

FROM base as application
WORKDIR /app
COPY --from=dependencies /app/node_modules node_modules
COPY --from=builder /app/dist dist
COPY . .
CMD [ "npm", "start" ]
