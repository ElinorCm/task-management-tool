FROM library/postgres
COPY ./data/create_db.sql /docker-entrypoint-initdb.d/
EXPOSE 5432

ENV POSTGRES_USER tripletriad
ENV POSTGRES_PASSWORD tripletriad
ENV POSTGRES_DB tripletriad