FROM node:latest
WORKDIR /back
# toutes les commandes seront à executer à partir d'ici
COPY ./back /back/
# relie les deux machines, on précise le dossier de départ et celu d'arrivée
RUN npm install
# sera executé dans /back
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]

ENV PORT=3000
ENV HOST=0.0.0.0
# tourne sur toutes les interfaces de Docker 

ENV PG_URL=postgres://okanban:okanban@host.docker.internal/okanban

ENV SESSION_SECRET=ViveFinalFantasy