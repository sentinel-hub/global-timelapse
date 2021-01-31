# ------------------------- BASE IMAGE -----------------------------------

FROM node:current-buster

RUN git clone https://github.com/mlubej/globe-temp

WORKDIR globe-temp

RUN npm install