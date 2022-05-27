FROM node:latest
WORKDIR /back
# toutes les commandes seront à executer à partir d'ici
COPY . /back/
# relie les deux machines, on précise le dossier de départ et celu d'arrivée
RUN npm install
# sera executé dans /back
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]

