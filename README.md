# Task Management API

This API supports user creation, listing, and searching for a user by email. The frontend is developed using Node.js, TypeScript, Fastify, and Prisma ORM. The API uses authentication using JSON Web Token and encryption with bcrypt. The project uses a non-relational database (MongoDB).

## Author
Assis Junior

## Getting Started

To run the project locally, follow the steps below.

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    https://github.com/AssFerj/tasks-api.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

The backend server should be running at http://localhost:3333.

## Usage

1. Use the application to create, list, edit, and delete tasks using the base URL: http://localhost:3333.
2. End point to create user: 'baseURL/user'
3. End point to get a user by email: 'baseUrl/user/:email'
4. End point to get all users: 'baseUrl/user'
5. End point to login: 'baseUrl/login'
6. End point to create task: 'baseUrl/user/:userId/task'
7. End point to list tasks: 'baseUrl/user/:userId/task'
8. End point to update a task: 'baseUrl/user/:userId/task/:taskId'
9. End point to delete a task: 'baseUrl/user/:userId/task/:taskId'
10. End point to view API documentation: 'baseUrl/docs'

### Technologies Used

- TypeScript
- Node.js
- Fastify
- Prisma ORM
- MongoDB
- JSON Web Token
- Bcrypt
- Zod
- Fastify
- Fastify Type Provider Zod
- Fastify Swagger
- Fastify Swagger UI

## Licence

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

### Contacts

- Email: [Assis Junior WM](mailto:assisjuniorwm@gmail.com)
- GitHub: [AssFerj](https://github.com/AssFerj)