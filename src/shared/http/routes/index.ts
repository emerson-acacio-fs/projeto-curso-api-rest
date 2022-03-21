import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Dev!' });
});

//--- ADD NEW ROUTE --- tag usada no plop --- NÃO REMOVER ESSA LINHA

export { routes };
