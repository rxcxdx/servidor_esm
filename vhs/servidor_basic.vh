server {
  expires -1;
  root /home/rcd/joaquina;
  location /ws {
    proxy_pass http://localhost:8000;
  }
}
