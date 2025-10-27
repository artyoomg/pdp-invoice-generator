FROM node:22

COPY . /app
WORKDIR /app

RUN npm i

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000
