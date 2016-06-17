FROM node:6.1.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PORT 80
RUN npm install -g webpack

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install; npm run build

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
CMD [ "npm", "start" ]