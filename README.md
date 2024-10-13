# Pet Care Backend API

## Project Overview

The Pet Care Backend API provides functionality for managing user accounts, creating and interacting with pet care tips and stories, handling payments for premium content, and ensuring secure authentication and authorization. The API is built using **Node.js**, **Express**, and **MongoDB** with **Mongoose**, ensuring a scalable and efficient backend system. Data validation is handled using **Zod**, and **JWT** secures access to protected routes.

## Objectives

- Set up a robust backend with **Node.js** and **Express.js**.
- Store user, post, comment, and payment data in **MongoDB** using **Mongoose**.
- Secure routes with **JWT** authentication and authorization for role-based access control.
- Validate all inputs and requests using **Zod** for enhanced data integrity.
- Implement **Stripe** for handling payments for premium content.
- Provide CRUD operations for managing posts and interactions between users (comments, votes).
- Provide admin functionality for managing users and content.

## Technologies

- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for managing users, posts, comments, and payments.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Zod**: Schema validation for request validation and data integrity.
- **JWT**: JSON Web Tokens for user authentication.
- **Stripe**: Payment processing for premium content.

## Features

### User Authentication & Authorization

- **JWT-based Authentication**: Users can register, log in, and access protected routes with a valid token.
- **Role-based Authorization**: Specific routes are restricted to users with admin privileges (e.g., managing posts).

### CRUD Operations for Posts & Comments

- **Create, Update, and Delete**: Users can create posts (tips or stories), update their content, and delete posts.
- **Commenting**: Users can comment on posts and reply to other users' comments.
- **Upvoting & Downvoting**: Users can upvote or downvote posts to rank content by popularity.

### Payments & Premium Content

- **Stripe Integration**: The API handles payments via Stripe for unlocking premium content.
- **Premium Posts**: Users can purchase access to premium content, which is restricted to paying users.

### Admin Features

- **Content Management**: Admins can manage all posts (approve, delete, or edit).
- **User Management**: Admins can manage user accounts and handle premium access permissions.

### Data Validation & Error Handling

- **Zod Validation**: All incoming requests are validated with Zod, ensuring that the data is correctly structured.
- **Global Error Handling**: The API returns informative error messages for invalid data, authentication issues, and server errors.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or Yarn
- MongoDB (Local instance or a cloud-based MongoDB Atlas)

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/IsaT10/bike-rental
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   PORT=7000

   SALT_ROUNDS=bcrypt_salt_round

   JWT_ACCESS_SECRET=secret_token

   ACCESS_TOKEN_EXPIRES_IN=toke expire time

   DATABASE_URL= Local MongoDB instance or use MongoDB Atlas URI
   ```

   - `PORT`: The port on which your server will run.
   - `MONGODB_URI`: Your MongoDB connection string. You can set up a local MongoDB instance or use a cloud-based MongoDB service like MongoDB Atlas.
   - `SALT_ROUNDS`: The number of bcrypt salt rounds used for hashing passwords. Higher values mean more secure but slower hashing.
   - `JWT_ACCESS_SECRET`: The secret key for signing JWTs. Keep this value secure and private. Example_value: 10
   - `ACCESS_TOKEN_EXPIRES_IN`: The expiration time for access tokens. Can be specified in seconds ("3600"), minutes ("60m"), hours ("1h"), or other time units.

4. **Run the Project**

   To start the development server, use the following command:

   ```bash
   npm run start:dev
   ```

5. **Available Scripts**

   - `npm run start`: Runs the project in production mode.
   - `npm run start:dev`: Runs the project in development mode with hot-reloading.
   - `npm run build`: Compiles TypeScript to JavaScript.
   - `npm run lint`: Runs ESLint for code linting.
   - `npm run lint:fix`: Runs ESLint and fixes any fixable issues.

[Petwise](https://pet-stories-mu.vercel.app/ 'Petwise')
