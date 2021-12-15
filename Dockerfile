FROM node:14

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4004

CMD ["npm", "run", "start"]