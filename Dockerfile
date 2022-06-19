FROM node:14

WORKDIR /app

# COPY . .

EXPOSE 8080

# VOLUME ["/app"]
ADD . .

RUN npm install yarn

RUN yarn

CMD ["yarn", "start"]
