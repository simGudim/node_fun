FROM node:9-slim
WORKDIR /app ./app
COPY package.json
RUN npm install
COPY . /app
CMD ["npm", "start"]