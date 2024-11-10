# Fullstack APP

## Project Overview

This project is a full-stack application built using **Nuxt.js** on the frontend and **Laravel** on the backend, with **Apollo GraphQL** for data fetching and **Laravel Lighthouse** handling GraphQL on the server. The state management is handled by **Pinia**, and **Sanctum** provides secure authentication.

### Features
- **Nuxt.js**: A Vue.js framework that supports SSR (Server Side Rendering) and static site generation.
- **Laravel**: A powerful PHP framework for backend logic and API handling.
- **Apollo GraphQL**: Frontend data management using GraphQL queries and mutations.
- **Laravel Lighthouse**: Integrates GraphQL API into Laravel.
- **Pinia**: Provides an intuitive and powerful state management solution.
- **Sanctum**: Implements secure authentication for API access.

## Tech Stack
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2C3E50?style=for-the-badge&logo=pinia&logoColor=yellow)
![Lighthouse](https://img.shields.io/badge/Laravel%20Lighthouse-10B981?style=for-the-badge&logo=graphql&logoColor=white)
![Sanctum](https://img.shields.io/badge/Sanctum-3498DB?style=for-the-badge&logo=laravel&logoColor=white)

### Frontend:
- [Nuxt.js](https://nuxtjs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)

### Backend:
- [Laravel](https://laravel.com/)
- [Laravel Lighthouse](https://lighthouse-php.com/)
- [Sanctum](https://laravel.com/docs/sanctum)

## Setup Instructions

### Prerequisites

Make sure you have the following software installed on your system:
- [Composer](https://getcomposer.org/) - PHP dependency manager
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [XAMPP](https://www.apachefriends.org/index.html) or another local server environment
- [PHP 8.2](https://www.php.net/) or a compatible version
- [GitHub CLI](https://cli.github.com/) (optional)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) (optional)

### Backend (Laravel + Lighthouse)

1. Clone the repository:

    ```bash
    git clone https://github.com/maktezi/APP.git
    cd APP
    ```

2. Install the backend dependencies:

    ```bash
    composer install
    ```

3. Copy the example environment file and set up environment variables:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Set up the database configuration in the `.env` file and run migration and seeders:

    ```bash
    php artisan migrate:fresh
    php artisan db:seed
    ```

5. Install Laravel Lighthouse for GraphQL:

    ```bash
    composer require nuwave/lighthouse
    ```

### Frontend (Nuxt.js)

1. Install the frontend dependencies:

    ```bash
    npm install
    ```

2. Start the Nuxt.js development server and Laravel server:

    ```bash
    npm start
    ```

## Authentication

This application uses **Laravel Sanctum** for API authentication. To authenticate a user, make a POST request to `/api/login` with the necessary credentials, and use the generated token for authenticated API requests.

## GraphQL API

GraphQL queries and mutations are handled by **Laravel Lighthouse**. You can explore and test the GraphQL API through the GraphQL Playground available at:
```bash
http://localhost:8000/graphiql
```
