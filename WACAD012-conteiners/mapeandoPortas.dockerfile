FROM ubuntu:latest

# Atualiza pacotes e instala o Nginx
RUN apt-get update && apt-get install -y nginx

# Altera o Nginx para escutar na porta 7000
RUN sed -i 's/listen 80 default_server;/listen 7000 default_server;/' /etc/nginx/sites-available/default && \
    sed -i 's/listen \[::\]:80 default_server;/listen \[::\]:7000 default_server;/' /etc/nginx/sites-available/default

# Expõe a porta 7000
EXPOSE 7000

# Comando para manter o Nginx rodando em foreground (necessário no Docker)
CMD ["nginx", "-g", "daemon off;"]

# Comando de build:
# docker build -t meu-nginx-ubuntu .
