#!/bin/bash

container_name=ancientworld-prod

if [ "$(docker ps -q -f name=${container_name})" ]; then
  docker stop ${container_name}
  docker rm ${container_name}
fi

docker build -t nyudlts/ancientworld-prod:latest . -f ./Dockerfile.prod 
docker run -d --name=ancientworld-prod -p 8001:80 nyudlts/ancientworld-prod:latest
