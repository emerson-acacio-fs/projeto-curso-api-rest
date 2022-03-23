import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Dev!' });
});

//--- ADD NEW ROUTE --- tag used in plop.js DON'T REMOVE THIS LINE

export { routes };
