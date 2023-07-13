# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:20.4-alpine3.17 as development

# Set working directory
WORKDIR /app

#
COPY ./web/package.json /app/package.json
COPY ./web/yarn.lock /app/yarn.lock

# 
RUN yarn install

COPY ./web /app

ENV CI=true
ENV PORT=3000

CMD [ "yarn", "start" ]


FROM development as build
RUN yarn build


FROM development as dev-envs
RUN <<EOF
apk update
apk add git
EOF

RUN <<EOF
useradd -s /bin/bash -m mysticcase
groupadd docker
usermod -aG docker mysticcase
EOF

# Install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "yarn", "start" ]


# 2. For Nginx setup
FROM nginx:1.25-alpine3.17

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]