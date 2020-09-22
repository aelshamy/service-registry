import axios from 'axios';
import { AddressInfo } from 'net';
import log from '../../common/src/logger';
import psj from '../package.json';
import app from './app';

const { name, version } = psj;

const start = async () => {
  const server = app.listen(0, async () => {
    const { port } = server.address() as AddressInfo;

    const registerService = async () =>
      await axios.put(
        `http://localhost:3000/register/${name}/${version}/${port}`
      );
    const unregisterService = () =>
      axios.delete(`http://localhost:3000/register/${name}/${version}/${port}`);

    registerService();

    const interval = setInterval(registerService, 20000);

    log.info(
      `Hi there! I'm listening on port ${port} in ${app.get('env')} mode.`
    );

    const cleanup = async () => {
      clearInterval(interval);
      await unregisterService();
      process.exit(0);
    };

    process.on('uncaughtException', cleanup);

    process.on('SIGINT', cleanup);

    process.on('SIGTERM', cleanup);
  });
};

start();
