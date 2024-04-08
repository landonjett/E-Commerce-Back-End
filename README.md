# E-Commerce Back End

## Description

This project is a back-end application for an e-commerce site. Built using Node.js, Express.js, Sequelize, and MySQL, it provides a robust API for managing a database of products, categories, and tags.

## Features

- CRUD operations for products, categories, and tags through a RESTful API.
- Database integration with MySQL using Sequelize ORM.
- Environment variable management for database configuration.

## Installation

To install this application, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install all necessary dependencies.
3. Create a `.env` file in the root directory to store your MySQL username, password, and database name as follows:

DB_NAME='ecommerce_db'
DB_USER='your_mysql_username'
DB_PASSWORD='your_mysql_password'


4. Run `npm run seed` to seed the database with sample data.
5. Start the server using `npm start`.

## Usage

Once the application is running, you can use Postman or any other API testing tool to interact with the API. The available routes are:

- `GET /api/categories` - Retrieve all categories
- `GET /api/categories/:id` - Retrieve a single category by ID
- `POST /api/categories` - Add a new category
- `PUT /api/categories/:id` - Update a category by ID
- `DELETE /api/categories/:id` - Delete a category by ID

Similar routes are available for products (`/api/products`) and tags (`/api/tags`).

## Demo

Watch a demo of the application in action [here](https://drive.google.com/file/d/1vW_79yMliXjXpNarYf11loYV0cH5EKoj/view?usp=sharing).

## Contributing

If you're interested in contributing, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
