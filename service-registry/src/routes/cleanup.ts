import log from '../../../common/src/logger';
import config from '../config/config';

const cleanUp = () => {
  const now = Math.floor(Date.now() / 1000);
  Object.keys(config.services).forEach((key) => {
    if (config.services[key].timestamp + config.serviceTimeout < now) {
      delete config.services[key];
      log.debug(`Service Removed with key: ${key}`);
    }
  });
};

export default cleanUp;
