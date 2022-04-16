FROM node:alpine

WORKDIR /Users/tengizalpenidze/Workspace/shopping-list

COPY ./ ./

RUN npm install

CMD ["npm", "start"]