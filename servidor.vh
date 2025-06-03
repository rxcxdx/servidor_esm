server {
  expires -1;
  root /home/rcd/apps/novo/dist;

  location = /index.html {
    auth_request /grant;
  }

  #location /imagens {
    #expires max;
  #}
  #location /static {
    #expires max;
  #}
  location /ws {
    proxy_pass http://localhost:8000;
  }
  location = /grant {
    internal;
    proxy_pass http://localhost:8000/ws/grant$request_uri;
  }
}

