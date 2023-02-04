# Stage 1 - builder
FROM node:18-alpine3.17 AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Install node libraries
ENV NODE_ENV production
ENV CI true
COPY package*.json ./
RUN npm ci

# Copy source code
# DON'T COPY ENV FILES WHEN BUILDING THE DOCKER IMAGE. ENV-DEPENDANT VARIABLES WILL BE INJECTED AT DEPLOY TIME, NOT AT BUILD TIME.
ADD public/ ./public/
ADD src/ ./src/
COPY tsconfig.json ./

# Build
RUN npm run build

# Stage 2 - runner
FROM nginx:latest as runner
WORKDIR /app
LABEL org.opencontainers.image.source="https://github.com/cienfuegos-dev/testing-cypress"

ARG APP_VERSION=local
ARG DOCKER_IMAGE=local

ENV REACT_APP_APP_VERSION=${APP_VERSION}
ENV REACT_APP_DOCKER_IMAGE=${DOCKER_IMAGE}

# Copy build artifacts
COPY --from=builder /app/build/ /usr/share/nginx/html/

# Copy nginx config, config gen script and add exec permissions
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/public-env.js.sh deploy/start.sh ./deploy/
RUN chmod 500 /app/deploy/public-env.js.sh /app/deploy/start.sh

# Create folder where to put public-env generated javascript
RUN (mkdir /usr/share/nginx/html/public-env || :)

EXPOSE 3000

CMD ["sh", "-c", "/app/deploy/start.sh"]

# Build docker locally and run with:
# docker build -t mewoing .
# docker run -it --rm -p 3000:3000 --env-file=.env mewoing
