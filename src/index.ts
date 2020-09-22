import app from './app';
import log from './config/logger';

const port = process.env.PORT || 3000;

const start = async () => {
  app.listen(port, () => {
    log.info(
      `Hi there! I'm listening on port ${port} in ${app.get('env')} mode.`
    );
  });
};

start();
