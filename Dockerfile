FROM node:20-alpine
WORKDIR /app
COPY server/package.json server/tsconfig.json server/prisma ./server/
WORKDIR /app/server
RUN npm install
COPY server/src ./src
COPY server/prisma ./prisma
RUN npm run prisma:generate
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
