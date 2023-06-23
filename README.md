# Bless Express

The instruction assumes that you have Yarn and pm2 installed globally.

1. Clone this repo from GitHub
2. Create `.env.local` using `.env.local.example`
3. Install required modules with `yarn`
4. Build application with `yarn build`
5. Install required packages with `composer update` in `share` directory
6. Create directory `share/posters/` and set write permissions for web-server's user
7. Navigate webserver to `out` directory

## nginx config

```
server {
    listen 443 ssl;

    server_name bless.express;
    root /srv/http/bless.express/out/;

    index index.html;
    error_page 404 /404.html;

    ssl_certificate /etc/letsencrypt/live/bless.express/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bless.express/privkey.pem;

    location / {
        try_files $uri $uri/ index.html =404;
    }

    rewrite ^/manifesto/?$ /manifesto.html break;

    location = /404.html {
        internal;
    }

    location /share/ {
        alias /srv/http/bless.express/share/;
        include fastcgi_params;

        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_param SCRIPT_FILENAME /srv/http/bless.express/share/index.php;

        location /share/posters/ {
            try_files $uri $uri/ =404;
        }

        location /share/anonymous/ {
            try_files $uri $uri/ =404;
        }
    }
}
```
