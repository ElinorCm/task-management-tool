FROM library/postgres 
# equivalent à library/postgres:latest
# image de départ officielle de postgres 
# ajout d'un tag pour préciser la version de l'image xxx:nomDeLaVersion 
# par défaut pull le latest 

COPY ./back/data/0_create_tables.sql /docker-entrypoint-initdb.d/
COPY ./back/data/1_import_data.sql /docker-entrypoint-initdb.d/
# à gauche machine à droite container 
# dossier qui va être lu par postgresql pour voir s'il a a des choses à executer 
# .d extension de demon, service qui se lance automatiquement

EXPOSE 5432

ENV POSTGRES_USER okanban
ENV POSTGRES_PASSWORD okanban
ENV POSTGRES_DB okanban
# michelisable car postqgresql recrée la database lorsqu'il se lance 