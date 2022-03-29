import express, { Application, Request, Response } from 'express';
import { imageRoutes } from './handlers/processImage';

const app: Application = express();
const port = 3000;

imageRoutes(app);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This route does not exist' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
