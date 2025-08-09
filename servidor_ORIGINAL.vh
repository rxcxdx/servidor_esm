server {
  root /home/rcd/joaquina;
  location = /index.html {
    expires -1;
    auth_request /grant;
  }
  location = /grant {
    internal;
    proxy_pass http://localhost:8000/ws/grant$request_uri;
  }
  location = /favicon.ico {
    expires max;
    return 200;
  }
  location /signin {
    expires -1;
  }
  location /static {
    expires max;
    autoindex on;
  }
  location /imagens {
    expires max;
    autoindex on;
  }
  location /ws {
    expires -1;
    proxy_pass http://localhost:8000;
  }
}
