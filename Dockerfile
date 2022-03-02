FROM node:alpine3.15 as module-stage
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk add git
RUN which git
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production
COPY . /app
RUN yarn install --production --silent --ignore-optional --pure-lockfile



FROM module-stage as build-stage
WORKDIR /app
ENV NEXT_TELEMETRY_DEBUG=1

RUN yarn install --force && yarn run build && rm -rf .next/cache


FROM node:alpine3.15 as prod-stage
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY --from=build-stage /app/.next /app/.next
COPY --from=module-stage /app/node_modules /app/node_modules
COPY . /app
RUN pm2 install pm2-logrotate \
      && pm2 set pm2-logrotate:max_size 10M \
      && pm2 set pm2-logrotate:retain 5 \

#RUN yarn cache clean --all

EXPOSE 80
ENTRYPOINT ["/bin/sh", "--", "./docker_entrypoint.sh"]
