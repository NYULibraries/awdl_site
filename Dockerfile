# Usage example
# 1) Build: $ rm -rf ./build && docker build -o build .

FROM node:10.15.1 as build

WORKDIR /usr/src/app

COPY . .

ARG GA='1'
ARG GA_CODE='UA-37717358-3'
ARG VIEWER='https://sites.dlib.nyu.edu/viewer'
ARG APP_URL='https://dlib.nyu.edu/ancientworld'
ARG APP_ROOT='/ancientworld'
ARG DISCOVERY='https://discovery1.dlib.nyu.edu/solr/viewer/select'
ARG COLLECTION_CODE='(awdl OR egypt)'

RUN npm install && \
  GA=${GA} GA_CODE=${GA_CODE} VIEWER=${VIEWER} APP_URL=${APP_URL} APP_ROOT=${APP_ROOT} DISCOVERY_CORE=${DISCOVERY_CORE} ./node_modules/hephaestus-cli/bin/hephaestus-cli forge
  
FROM scratch AS export-stage

COPY --from=build /usr/src/app/build /
