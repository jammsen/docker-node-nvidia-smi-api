FROM --platform=amd64 jammsen/node-nvidia-smi-base:21.7-bookworm

LABEL maintainer="Sebastian Schmidt - https://github.com/jammsen"
LABEL org.opencontainers.image.authors="Sebastian Schmidt"
LABEL org.opencontainers.image.source="https://github.com/jammsen"

COPY --chown=node:node --chmod=755 index.js /home/node/app/
COPY --chown=node:node --chmod=755 package.json /home/node/app/
COPY --chown=node:node --chmod=755 package-lock.json /home/node/app/

USER node

WORKDIR /home/node/app
RUN npm ci

CMD [ "node", "index.js" ]
