FROM node:latest
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY package-lock.json .
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["yarn", "run", "dev"]