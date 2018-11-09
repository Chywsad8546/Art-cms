FROM nginx
COPY ./dist/* /www
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
