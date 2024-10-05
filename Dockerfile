FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 3000

# prisma generate is used to generate the prisma client
RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build

CMD [ "npm", "run", "start:prod"]