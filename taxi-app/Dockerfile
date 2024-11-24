FROM node:20
WORKDIR /src 
COPY package*.json ./ 
RUN npm install
COPY . . 
EXPOSE 80
CMD ["npm", "run", "dev"]
