FROM node:16.13.2-alpine

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
