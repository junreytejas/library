# Book Management API with Next.js

## Project Description

This project implements a simple RESTful API for managing a collection of books using Next.js and Node.js. It provides endpoints to perform CRUD operations on books, including creating new books, retrieving all books or a single book by ID, updating a book's details, and deleting a book.

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <[https://github.com/junreytejas/library.git>
   cd <library>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start the Next.js development server.

4. **Access the API:**

   The API endpoints will be available on `http://localhost:3000/api/books` for managing books and `http://localhost:3000/api/books/{id}` for individual book operations.
   
   Best use `Postman` for clear and easy way of interacting with the API endpoints.

## API Endpoint Documentation

### Get All Books

- **URL:** `/api/books`
- **Method:** `GET`
- **Description:** Retrieves a list of all books.
- **Responses:**
  - `200 OK`: Returns an array of books.
  - `500 Internal Server Error`: If server encounters an issue.

### Add a New Book

- **URL:** `/api/books`
- **Method:** `POST`
- **Description:** Adds a new book to the collection. Can accept single Book object or an Array of Book objects.
- **Request Body:** JSON object following the `Book` schema or `Array` of `Book` objects.
- **Responses:**
  - `201 Created`: Returns the newly added book.
  - `400 Bad Request`: If request body is invalid or missing required fields.
  - `500 Internal Server Error`: If server encounters an issue.

### Get a Book by ID

- **URL:** `/api/books/{id}`
- **Method:** `GET`
- **Description:** Retrieves details of a book by its ID.
- **Parameters:**
  - `id` (path): ID of the book to retrieve.
- **Responses:**
  - `200 OK`: Returns the book object.
  - `400 Bad Request`: If ID is invalid or missing.
  - `404 Not Found`: If book with specified ID does not exist.
  - `500 Internal Server Error`: If server encounters an issue.

### Update a Book by ID (Partial Update)

- **URL:** `/api/books/{id}`
- **Method:** `PATCH`
- **Description:** Updates details of a book by its ID.
- **Parameters:**
  - `id` (path): ID of the book to update.
- **Request Body:** JSON object following the `Book` schema with fields to update.
- **Responses:**
  - `200 OK`: Returns the updated book object.
  - `400 Bad Request`: If request body is invalid or missing required fields.
  - `404 Not Found`: If book with specified ID does not exist.
  - `500 Internal Server Error`: If server encounters an issue.

### Replace a Book by ID (Full Update)

- **URL:** `/api/books/{id}`
- **Method:** `PUT`
- **Description:** Replaces details of a book by its ID.
- **Parameters:**
  - `id` (path): ID of the book to update or create if not exists.
- **Request Body:** JSON object following the `Book` schema with all fields.
- **Responses:**
  - `201 Created`: Returns the created or replaced book object.
  - `400 Bad Request`: If request body is invalid or missing required fields.
  - `500 Internal Server Error`: If server encounters an issue.

### Delete a Book by ID

- **URL:** `/api/books/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a book by its ID.
- **Parameters:**
  - `id` (path): ID of the book to delete.
- **Responses:**
  - `200 OK`: Returns success message after deletion.
  - `404 Not Found`: If book with specified ID does not exist.
  - `500 Internal Server Error`: If server encounters an issue.

## Example Requests and Responses

### Example: Adding a New Book

**Request:**

```http
POST /api/books
Content-Type: application/json

{
  "title": "Example Book",
  "author": "John Doe",
  "publishedDate": "2023-01-01",
  "summary": "This is an example book."
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Example Book",
  "author": "John Doe",
  "publishedDate": "2023-01-01",
  "summary": "This is an example book."
}
```
