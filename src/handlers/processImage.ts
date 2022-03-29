import { Application, Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

fs.mkdirSync('./src/assets/resized', { recursive: true });

const imageArray: string[] = [];

fs.readdir('./src/assets/images', (err, files) => {
  if (err) {
    throw new Error(`${err}`);
  } else {
    files.forEach((file) => {
      imageArray.push(`./src/assets/images/${file}`);
    });
  }
});

export const resizeImages = (req: Request, res: Response) => {
  if (imageArray.length > 1) {
    imageArray.map((item) => {
      const filenames = item.split('/');
      const file = filenames[filenames.length - 1];
      sharp(item).resize(200, 200).toFile(`./src/assets/resized/${file}`);
    });
  }
  res.status(201).json({ message: 'Images resized successfully' });
};

export const imageRoutes = (app: Application) => {
  app.get('/', resizeImages);
};
