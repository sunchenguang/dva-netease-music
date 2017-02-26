FROM node:boron

MAINTAINER sunchenguang <sunchenguang12@gmail.com>

# creat workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app/
RUN npm install

# copy other codes and resources
COPY . /usr/src/app

EXPOSE 8000
# ENTRYPOINT diff CMD CDM can be overrided
CMD [ "npm", "start" ]
