FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . ./
ENV PORT 5173
EXPOSE $PORT
RUN npm run build
CMD ["node","build/index.js"]
