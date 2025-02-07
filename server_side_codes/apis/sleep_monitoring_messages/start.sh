#!/bin/bash
app="sara.sleep.monitoring.message"
docker stop ${app}
docker rm ${app}
docker build --pull --no-cache -t ${app} .
docker run -d -p 56733:80 \
  --name=${app} \
  -v $PWD:/app ${app}