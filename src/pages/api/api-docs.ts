import { swaggerSpec } from '@/lib/swagger';
import { serve, setup } from 'swagger-ui-express';
import { NextFunction, Request, Response } from 'express';

const swaggerHandler = setup(swaggerSpec);

export default async (req: Request, res: Response, next:NextFunction) => {
    if (req.method === 'GET') {
      try {
        swaggerHandler(serve, res, next);
 
      } catch (err) {
        console.error('Error serving Swagger UI:', err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };