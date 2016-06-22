FROM mhart/alpine-node:6.2

WORKDIR /src
ADD . .

RUN npm install --global webpack; npm install; npm run build;

ENV PORT 80
ENV NODE_ENV production

EXPOSE 80
CMD [ "npm", "start" ]

