FROM nginx
RUN mkdir /data/dist -p
RUN chown nginx.nginx -R /data/dist
ADD nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /data/
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"