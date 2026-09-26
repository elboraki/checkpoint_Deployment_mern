FROM node:24-alpine AS build
WORKDIR /app

COPY server/package.json server/package.json
COPY client/package.json client/package.json

RUN npm install --prefix server --omit=dev \
 && npm install --prefix client

COPY server server
COPY client client

RUN npm run build --prefix client

FROM node:24-alpine AS runtime
WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=8080

COPY --from=build /app/server /app/server

EXPOSE 8080
CMD ["node", "index.js"]
