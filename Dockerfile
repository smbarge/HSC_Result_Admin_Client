FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . ./
ENV PORT 5173
ENV VITE_APISERVER=http://aa0a0cebc042b48338d249f67f6261b8-404489579.ap-south-1.elb.amazonaws.com
#ENV VITE_APISERVER=http://3.110.75.194:3001
EXPOSE $PORT
RUN npm run build
CMD ["node","build/index.js"]

