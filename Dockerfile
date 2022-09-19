FROM node:18.9.0-alpine3.16
ENV NODE_ENV production
RUN mkdir /app
RUN chown node /app
USER node
WORKDIR /app
COPY . /app
RUN npm ci --only=production
CMD ["npm", "start"]