import express, { Request, Response } from 'express';
import config from '../config/config';
import log from '../config/logger';

const router = express.Router();
router.delete(
  '/register/:name/:version/:port',
  (req: Request, res: Response) => {
    const { name, version, port } = req.params;

    const ip = req.connection.remoteAddress?.includes('::')
      ? `[${req.connection.remoteAddress}]`
      : req.connection.remoteAddress!;

    const key = `${name}${version}${ip}${port}`;
    delete config.services[key];
    log.debug(
      `Service deleted with name: ${name}, version: ${version} at ${ip}:${port}`
    );
    return res.send({ result: key });
  }
);

export default router;
