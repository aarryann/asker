FROM mhart/alpine-node:12 AS app

WORKDIR /app
COPY package.json package-lock.json ./

# install dependencies
RUN apk add --no-cache --virtual .gyp python make g++
RUN npm ci
RUN apk del .gyp

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

#docker build -t aarryann/asker .
#docker run --init -d --expose 3000 --env PORT=3000 -p 3000:3000 --name asker_app aarryann/asker