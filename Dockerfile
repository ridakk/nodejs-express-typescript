# 1st Stage for installing dependencies
FROM node:10.16.3 AS build-deps
COPY package*.json yarn.lock* /build/
WORKDIR /build
RUN yarn

# 2nd Stage for compiling typescript
FROM node:10.16.3 AS compile-env
RUN mkdir /compile
COPY --from=build-deps /build /compile
WORKDIR /compile
COPY . .
RUN yarn build

# 3rd Stage for installing runtime dependencies
FROM node:10.16.3 AS runtime-deps
COPY package*.json yarn.lock* /build/
WORKDIR /build
RUN yarn --prod

# Final Stage for running application
FROM node:10.16.3-alpine AS runtime-env
WORKDIR /app
COPY --from=compile-env --chown=node:node /compile/dist /app
COPY --from=runtime-deps --chown=node:node /build /app
COPY --chown=node:node config /app/config
USER node
EXPOSE 8000
ENV NODE_ENV=production
CMD [ "node", "server.js" ]
