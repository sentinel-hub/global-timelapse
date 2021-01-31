# ------------------------- BASE IMAGE -----------------------------------

FROM node:current-buster

RUN git clone https://github.com/mlubej/global-timelapse

WORKDIR global-timelapse

RUN npm install