# Nibbly Nutrition Tracker

Nibbly Nutrition Tracker is a self-hosted service that helps users easily **track their nutrition** by weighing and logging food. Simply weigh your food, input it into the app, and instantly receive detailed nutrition data such as calories, macros, vitamins, and more.

**Note** - Nibbly Nutrition Tracker is in active development, and at this time users are required to enter their own foods before using the service.

## Features

* Add and customize your own foods
* Super fast data input with fuzzy text matching
* Single user authentication
* Workout calorie tracking

## How to use

Enter the weighed foods in this format: `<weight in grams> <food name>`, for example:

```txt
50 bread
65 potato
50 cauliflower
12 dark chocolate
```

The application will perform fuzzy text analysis to find the best matching foods. No need to 

## How to install

Requirements: Docker, a publicly available server, and a domain with SSL (HTTPS) setup.

1. Clone the repository: `git clone https://github.com/imivi/nutrition-tracker`
1. Rename .env.example to .env, and enter your domain
1. Run using Docker compose: `docker compose -f docker-compose.prod.yml up`. By default the API runs on port 9001 and the frontend on port 9000. The SQLite database will be located inside `api/database`.
1. Configure a reverse proxy (Nginx, Apache) to proxy requests from your domain to the API and frontend. These may be different domains, as the API configures CORS appropriately.
1. On first launch, you will be prompted to create a new account.