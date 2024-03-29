FROM node:18-alpine As development

WORKDIR /usr/src/app

RUN chmod -R 777 /usr/src/app
COPY --chown=node:node package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install
COPY --chown=node:node . .
USER node

# prod build
FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm install --only=production && npm cache clean --force

USER node

# prod

FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
