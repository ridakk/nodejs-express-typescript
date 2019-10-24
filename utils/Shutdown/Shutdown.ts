import logger from '../logger';
import eventEmitter from '../eventEmitter';
import { PROCESS_SHUTDOWN, PROCESS_EXIT } from './events';

class Shutdown {
  isShuttingDown: boolean;
  shutdownDelay: number;
  exitDelay: number;
  constructor({ shutdownDelay = 30000, exitDelay = 300 } = {}) {
    this.isShuttingDown = false;
    this.shutdownDelay = shutdownDelay;
    this.exitDelay = exitDelay;

    this.bindHandlers();
  }

  bindHandlers(): void {
    process.on('uncaughtException', this.handleUncaughtException.bind(this));
    process.on('SIGTERM', this.handleSignal.bind(this));
    process.on('SIGINT', this.handleSignal.bind(this));
  }

  unbindHandlers(): void {
    process.removeAllListeners('uncaughtException');
    process.removeAllListeners('SIGTERM');
    process.removeAllListeners('SIGINT');
  }

  handleUncaughtException(err: Error): void {
    logger.error({ err }, 'Uncaught Exception received');
    this.graceful();
  }

  handleSignal(signal: NodeJS.Signals): void {
    logger.debug(`${signal} received`);
    this.graceful();
  }

  graceful(): void {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;
    this.unbindHandlers();
    eventEmitter.emit(PROCESS_SHUTDOWN);

    logger.info(`will be shutting down in ${this.shutdownDelay} ms`);
    setTimeout(() => {
      eventEmitter.emit(PROCESS_EXIT);
      logger.info('Server is shutting down...');

      setTimeout(() => {
        // .unref is required to not to block event loop to wait until
        // this timer to expire if process is able to exit on its own.
        process.exit(1); // eslint-disable-line no-process-exit
      }, this.exitDelay).unref();

      // We can set process.exitCode and allow the process to exit
      // naturally once event loop is empty
      //
      // But we need to be sure that we are avoiding scheduling any
      // additional work for the event loop otherwise will
      // always be shutting down forcefully with timer above.
      //
      // Any existing timers, open connections to dbs etc...
      // must be closed in order to perform graceful shutdown
      // properly.
      process.exitCode = 1;
    }, this.shutdownDelay);
  }
}

export default Shutdown;
