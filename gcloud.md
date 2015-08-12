###Gcloud Project
Project ID: mindful-server-97510
API key: AIzaSyB7ph1LU1zxfrxS4T2g52QW76FMexEe9lo


###Build

docker build -t codeworks/plantzr .

docker tag codeworks/plantzr gcr.io/mindful-server-97510/plantzr

//gcloud preview docker push gcr.io/mindful-server-97510/plantzr


###RUN
$ kubectl run plantzr-pod --image=codeworks/plantzr --port=8080


###Ports
OPen Mongo port
Deploy & manage --> Deployments--> select an instance --> more about this resource

https://console.developers.google.com/project/mindful-server-97510/compute/instancesDetail/zones/europe-west1-c/instances/mongo-db-0jyf?graph=GCE_CPU
-->
https://console.developers.google.com/project/mindful-server-97510/compute/networksDetail/global/networks/default
-->
Add firewall rule




###boot2docker

boot2docker start
eval "$(boot2docker shellinit)"


//#!/bin/bash
//# Delete all containers
//docker rm $(docker ps -a -q)
//# Delete all images
//docker rmi $(docker images -q)


https://cloud.google.com/compute/docs/containers


NMAP --> brew install nmap
Starting Nmap 6.47 ( http://nmap.org ) at 2015-06-24 10:43 WEST
Nmap scan report for 209.109.211.130.bc.googleusercontent.com (130.211.109.209)
Host is up (0.057s latency).
PORT      STATE SERVICE
27017/tcp open  unknown














