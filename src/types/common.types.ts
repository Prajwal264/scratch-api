import { Request, Response } from 'express';
import { Stream } from 'stream';

export type Context = {
  req: Request,
  res: Response,
  userId?: string,
}

export interface Upload {
  filename: string;
  mimeType: string;
  encoding: string;
  createReadStream: () => Stream
}