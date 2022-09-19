from node:16
WORKDIR /app
COPY package*.json
RUN npm install
COPY . .
ENTRYPOINT npm run start