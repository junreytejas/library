import Book from "@/models/Book"

export default function verifyBookFields (book:Book) {

    const response: {result:boolean, message: string} = {
      result: true,
      message: ""
    }
  
    if(!book.title){
       response.result = false
       response.message = 'Missing Book Title'
    } else if (!book.author) {
      response.result = false
      response.message = 'Missing Book Author'
    } else if (!book.publishedDate) {
      response.result = false
      response.message = 'Missing Book Published Date'
    } else if (!book.summary) {
      response.result = false
      response.message = 'Missing Book Summary'
    }
  
    return response
  
  }