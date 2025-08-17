server {
  root /home/rcd/joaquina;
  expires -1;
  location = /favicon.ico {
    expires max;
    return 200;
  }
  location /ws {
    expires -1;
    proxy_pass http://localhost:8000;
  }
}
