FROM node:latest
WORKDIR /obictrade_web
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "start" ]