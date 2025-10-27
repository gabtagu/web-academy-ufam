FROM node:18.16-slim
WORKDIR /home/app
COPY front.js .
RUN npm init -y
RUN npm install querystring
EXPOSE 3000
CMD [ "node", "front.js" ]
