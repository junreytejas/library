// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Book from "@/models/Book";
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
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Book'
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Book'
 *     responses:
 *       201:
 *         description: Successfully added the book(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Book'
 *       400:
 *         description: Invalid request body or missing required fields
 *       500:
 *         description: Internal server error
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        // get all books
        res.status(200).json(books);
        break;

      case "POST":
        const payload = req.body;
        const toStore: Book[] = [];

        // check if the payload passed is an array
        if (Array.isArray(payload)) {
          payload.forEach((book) => {
            const verifyBook = verifyBookFields(book);
            if (!verifyBook.result) {
              return res.status(400).json({ message: verifyBook.message });
            }

            toStore.push({
              id: books.length + toStore.length,
              title: book.title,
              author: book.author,
              publishedDate: formatDate(new Date(book.publishedDate)),
              summary: book.summary,
            });
          });
        } else {
          const verifyBook = verifyBookFields(payload);
          if (!verifyBook.result) {
            return res.status(400).json({ message: verifyBook.message });
          }

          toStore.push({
            id: books.length,
            title: payload.title,
            author: payload.author,
            publishedDate: formatDate(new Date(payload.publishedDate)),
            summary: payload.summary,
          });
        }

        books.push(...toStore);
        res.status(201).json(toStore);
        break;

      default:
        // method not supported
        res.status(400).json({ message: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    // internal server error
    res.status(500).json({ message: "Internal Server Error Occurred" });
  }
}
