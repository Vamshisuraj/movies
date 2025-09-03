FROM nginx
LABEL This is my first one
EXPOSE 80
COPY . /usr/share/nginx/html
