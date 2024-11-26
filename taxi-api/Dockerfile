FROM node:20
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=prisma/schema.prisma
EXPOSE 8080
CMD ["npm", "run", "dev"]