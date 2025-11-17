FROM postgres:16

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1
ENV POSTGRES_DB=postgres

COPY postgres-data /var/lib/postgresql/data


