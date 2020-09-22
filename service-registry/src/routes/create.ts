import express, { Request, Response } from 'express';
import log from '../../../common/src/logger';
import config from '../config/config';
import cleanUp from './cleanup';

const router = express.Router();
router.put('/register/:name/:version/:port', (req: Request, res: Response) => {
  cleanUp();
  const { name, version, port } = req.params;

  const ip = req.connection.remoteAddress?.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress!;

  const key = `${name}${version}${ip}${port}`;

  if (!config.services[key]) {
    config.services[key] = {
      timestamp: Math.floor(Date.now() / 1000),
      ip,
      port,
      name,
      version,
    };
    log.debug(
      `Service added with name: ${name}, version: ${version} at ${ip}:${port}`
    );
  } else {
    config.services[key].timestamp = Math.floor(Date.now() / 1000);
    log.debug(`Service ${name} updated at ${config.services[key].timestamp}`);
  }
  return res.send({ result: key });
});

export default router;
