FROM node:latest
WORKDIR /usr/src/web
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "start" ]