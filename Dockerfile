FROM node:15.8-alpine3.11 AS build
WORKDIR .

RUN npm install -g live-server

RUN apk update
RUN apk upgrade
RUN apk add bash

RUN apt update
RUN apt install nginx

WORKDIR ./bimcod