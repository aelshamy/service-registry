import psj from '../../package.json';
const { name, version } = psj;

export type ServiceObject = {
  timestamp: number;
  ip: string;
  port: string;
  name: string;
  version: string;
};

export type ServiceConfig = {
  name: string;
  version: string;
  serviceTimeout: number;
  services: { [key: string]: ServiceObject };
};

const config: ServiceConfig = {
  name,
  version,
  serviceTimeout: 30,
  services: {},
};

export default config;
