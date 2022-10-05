import { ConsoleLogger } from '@nestjs/common';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import * as bunyan from 'bunyan';

export class CloudLoggingLogger extends ConsoleLogger {
    logger: bunyan;

    constructor() {
        super();
        const loggingBunyan = new LoggingBunyan();

        this.logger = bunyan.createLogger({
            name: 'my-service',
            streams: [loggingBunyan.stream('info')],
        });
    }

    log(message: any, context?: string) {
        super.log(message, context);
        this.logger.debug(message);
    }

    error(message: any, stack?: string, context?: string) {
        super.error(message, stack, context);
        this.logger.error(message);
        this.logger.trace(stack);
    }

    warn(message: any, context?: string) {
        super.warn(message, context);
        this.logger.warn(message);
    }

    debug(message: any, context?: string) {
        super.debug(message, context);
        this.logger.debug(message);
    }

    verbose(message: any, ...optionalParams: any[]) {
        super.verbose(message, ...optionalParams);
        this.logger.debug(message);
    }
}
