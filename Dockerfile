FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . ./
ENV PORT 5173
ENV VITE_APISERVER=https://hscresult.chanakyasoft.com
#ENV VITE_APISERVER=http://3.110.75.194:3001
EXPOSE $PORT
RUN npm run build
CMD ["node","build/index.js"]

