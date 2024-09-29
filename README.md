# Event Sourcing App with Domain-Driven Design (DDD)

This repository contains the code for the event-sourcing application following Domain-Driven Design (DDD) principles. The app is built with Node.js, TypeScript, Kafka, and PostgreSQL, and showcases how to model business domains with event sourcing.

## Blog Post
For a detailed walkthrough and explanation of the concepts used in this project, check out the accompanying blog:  
[Let's Build an Event Sourcing App with DDD - Part 1](https://medium.com/@whoz_/lets-build-an-event-sourcing-app-with-ddd-pt-1-b6f5b3dba110)

## Setup

### 1. Run Docker for PostgreSQL and Kafka
To spin up the required services (PostgreSQL and Kafka), run:
```bash
docker-compose up -d
```
2. Run Database Migrations
Once PostgreSQL is running, apply the database migrations:
```bash
npm run migrate
```
3. Start the Application
Start the application by running:

```bash
npm run start
```

License
This project is licensed under the MIT License.