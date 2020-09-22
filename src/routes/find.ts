import express, { Request, Response } from 'express';
import semver from 'semver';
import config from '../config/config';
import cleanUp from './cleanup';

const router = express.Router();
router.get('/find/:name/:version', (req: Request, res: Response) => {
  cleanUp();
  const { name, version } = req.params;

  const candidates = Object.values(config.services).filter(
    (service) =>
      service.name === name && semver.satisfies(service.version, version)
  );

  const service = candidates[Math.floor(Math.random() * candidates.length)];

  if (!service) {
    return res.status(404).send({ result: 'Service not found' });
  }

  return res.send({ result: service });
});

export default router;
