###Project id###
Project ID: mindful-server-97510


###Build###

docker build -t codeworks/plantzr .

docker tag codeworks/plantzr gcr.io/mindful-server-97510/plantzr

gcloud preview docker push gcr.io/mindful-server-97510/plantzr


###RUN###

Deprecated:
gcloud alpha container kubectl run plantzr-pod --image gcr.io/mindful-server-97510/plantzr


 gcloud compute instances create plantzr-instance \
 --image gcr.io/mindful-server-97510/plantzr \
 --metadata-from-file google-container-manifest=containers.yaml \
 --zone europe-west1-c \
 --machine-type n1-standard-1




###boot2docker###

boot2docker start
eval "$(boot2docker shellinit)"


//#!/bin/bash
//# Delete all containers
//docker rm $(docker ps -a -q)
//# Delete all images
//docker rmi $(docker images -q)





















