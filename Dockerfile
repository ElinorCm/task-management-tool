FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 1234
ENTRYPOINT ["node", "index.js"]

ENV PORT=1234
ENV HOST=0.0.0.0

ENV PGHOST=host.docker.internal
ENV PGDATABASE=tripletriad
ENV PGUSER=tripletriad
ENV PGPASSWORD=tripletriad
ENV PGPORT=5435

ENV SESSION_SECRET=ViveFinalFantasy