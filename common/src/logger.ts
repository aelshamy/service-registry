import bunyan from 'bunyan';
import psj from '../package.json';
const { name, version } = psj;

const getLogger = (
  serviceName: string,
  serviceVersion: string,
  level: bunyan.LogLevel
) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

let level: bunyan.LogLevel;
switch (process.env.NODE_ENV) {
  case 'production':
    level = 'info';
    break;
  case 'test':
    level = 'fatal';
    break;
  default:
    level = 'debug';
}

const log = getLogger(name, version, level);

export default log;
