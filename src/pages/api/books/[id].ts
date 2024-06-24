// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { books } from "@/stores/stores";
import { formatDate } from "@/utils/formatDate";
import verifyBookFields from "@/utils/verifyBookFields";

/**
 * @swagger
 * definitions:
 *   Book:
 *     type: object
 *     required:
 *       - title
 *       - author
 *       - publishedDate
 *       - summary
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       publishedDate:
 *         type: string
 *         format: date
 *       summary:
 *         type: string
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Invalid book ID or missing parameter
 *       404:
 *         description: Book with specified ID not found
 *   patch:
 *     summary: Update a book by ID (partial update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: Successfully updated the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Invalid request body or missing required fields
 *       404:
 *         description: Book with specified ID not found
 *   put:
 *     summary: Replace a book by ID (full update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to update or create
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Book'
 *     responses:
 *       201:
 *         description: Successfully created or replaced the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Book'
 *       400:
 *         description: Invalid request body or missing required fields
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Book with specified ID not found
 *       500:
 *         description: Internal server error
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    // Check if book ID is a number
    if (!id || Array.isArray(id) || isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    // Parse ID as integer to use it as an array index
    const convertedBookId = parseInt(id);

    // Fetch the requested book record
    const requestedBook = books.find((book) => book.id === convertedBookId);

    // Return 404 if ID does not match any book record for non-PUT methods
    if (!requestedBook && req.method !== "PUT") {
      return res.status(404).json({ message: "Resource Not Found" });
    }

    // Fetch the payload data
    const payload = req.body;

    switch (req.method) {
      case "GET":
        // Send back the book that was fetched earlier
        res.status(200).json(requestedBook);
        break;

      case "PATCH":
        // Update publishedDate if provided
        payload.publishedDate = payload.publishedDate
          ? formatDate(payload.publishedDate)
          : requestedBook.publishedDate;

        // Override existing book data with payload
        const updatedBook = { ...requestedBook, ...payload };

        // Update the book record
        books[convertedBookId] = updatedBook;

        res.status(200).json(updatedBook);
        break;

      case "PUT":
        // Verify all fields are present
        const verifyBook = verifyBookFields(payload);
        if (!verifyBook.result) {
          return res.status(400).json({ message: verifyBook.message });
        }

        // Assign new book data to given ID, replace existing or create new
        books[convertedBookId] = {
          id: convertedBookId,
          title: payload.title,
          author: payload.author,
          publishedDate: formatDate(new Date(payload.publishedDate)),
          summary: payload.summary,
        };

        res.status(201).json(books[convertedBookId]);
        break;

      case "DELETE":
        // Remove the book from the record
        books.splice(convertedBookId, 1);

        // Return remaining books record
        res.status(200).json({
          status: "success",
          message: `Book ${convertedBookId} deleted successfully`,
        });
        break;

      default:
        // Method not allowed
        res.status(400).json({ message: `Method ${req.method} not allowed.` });
        break;
    }
  } catch (error) {
    // Internal server error
    res.status(500).json({ message: "Internal Server Error Occurred" });
  }
}
