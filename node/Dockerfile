FROM node:latest

COPY . /src

RUN npm install --production -d --registry=https://registry.npm.taobao.org
RUN cd /src; npm install

EXPOSE 3000

CMD ["node","/src/index.js"]
