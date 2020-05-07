# API Back-end: Task Managment App

API Back-end Repository for Task Managment App (TypeScript, Node & PostgreSQL).

## Installation

```bash
# setup
$ npm install
```

## Running the app (development)

1. Create a new PostgreSQL database `db_task_management_app` in your local machine.
1. Copy `config_sample` folder and rename the copied folder to `config`.
1. Change any configuration from `config/development.yml` based on your environment setup. Example, changing `db.password` to the password you have in your local PostgreSQL database.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
