
events {
  worker_connections 1024;
}
http {
    upstream backend {
      least_conn;
      server 52.53.151.206;
      server 54.193.101.198;
      server 13.57.226.225;
      keepalive 32;
     }
  server {
    listen 80;
    access_log off;
    root /home/usr/nginx/html;
    server_name ec2-13-52-221-105.us-west-1.compute.amazonaws.com;
    location / {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    }
    location /loaderio-7b640027995fd67400c201b5a35e4ee7.txt {
    }
  }
}
