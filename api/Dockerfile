# Stage 1
FROM node:18-alpine

WORKDIR /app

VOLUME /app/database

COPY package*.json .
COPY tsconfig*.json .

RUN npm install --force

COPY . .

# RUN npm run init-db

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]