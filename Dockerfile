FROM    centos:centos6

### Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
### Install Node.js and npm
RUN     yum install -y npm

### Bundle app source
COPY ./dist /plantzr
COPY mongodb-org-2.6.repo /etc/yum.repos.d/mongodb-org-2.6.repo

### Mongo
RUN yum install -y mongodb-org

#EXPOSE 27017

RUN service mongod start

RUN mongo use plantzr

RUN db.createUser( { "user" : 'plantzrUsr', 'pwd': 'pla0ntzr6', 'roles' : [ 'readWrite'] })"

RUN exit

#RUN semanage port -a -t mongod_port_t -p tcp 27017

### ENV var for gCloud
#ENV MONGO_GCLOUD_URI mongodb://appUser:pl1ntzr9@130.211.109.209:27017/plantzr



###Don't install devDependencies
RUN npm config set production

ENV NODE_ENV production
RUN cd /plantzr; npm install

EXPOSE  8080
CMD ["node", "plantzr/server/app.js"]