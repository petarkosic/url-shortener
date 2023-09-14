![URL Shortener](./client/src/assets/url-shortener.png 'URL Shortener Home Page')

This is a simple URL shortening service that allows you to create short, easy-to-share links from long URLs.

This URL shortening service simplifies long and complex URLs into shorter, more manageable links.
This README provides an overview of the app's features and installation instructions.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)

## Features

- Shorten long URLs into easy-to-manage short links.
- Add URLs to the history component to see which URLs have you shortened in the current session.
  (history is not saved between sessions and will be cleared when you close the app).

- Redirect users to the original URL when they visit a shortened link.
- Save all URLs to the database.

## Requirements

- Docker (https://www.docker.com/)

## Installation

Make sure that docker is running on your machine.

Clone the project and navigate to it:

```
git clone https://github.com/petarkosic/url-shortener.git
cd /url-shortener
```

Inside the `/server` folder, create an `.env` file.

```
PORT=<server-port> (default = 5000)
REDIS_URL=<redis-url> (default = redis://redis:6379)
```

To start the application, from the root project directory run:

```
docker compose up
```

Go to (http://localhost:3000/) to see the application.

The app uses [redis-stack](https://hub.docker.com/r/redis/redis-stack) docker image to store the URLs.

The docker command above also exposes RedisInsight on port 8001. You can use RedisInsight by pointing your browser to http://localhost:8001.

To stop the application, from the root project directory run:

```
docker compose down
```
