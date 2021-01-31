# ------------------------- BASE IMAGE -----------------------------------

FROM node:current-buster

RUN git clone https://github.com/sentinel-hub/global-timelapse

WORKDIR global-timelapse

RUN npm install