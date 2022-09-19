# FROM ode:16.15-alpine3.14
# # from node:16
# WORKDIR /app
# COPY package*.json
# RUN npm install
# COPY . /app
# # CMD ["npm", "start"]
# # ENTRYPOINT npm run start

FROM node:16.15-alpine3.14
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY . .
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 3002
CMD [ "npm", "start"]
