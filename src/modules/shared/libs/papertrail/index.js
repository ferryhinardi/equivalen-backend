import os from 'os';
import { Logger, transports } from 'winston';
import { Papertrail } from 'winston-papertrail';

const papertrailAutoSetup = typeof process.env.SERVICE_LABEL !== 'undefined';
const papertrailHostActive = typeof process.env.PAPERTRAIL_HOST !== 'undefined';
const papertrailPortActive = typeof process.env.PAPERTRAIL_PORT !== 'undefined';
const papertrailActive = papertrailHostActive && papertrailPortActive;
const consoleTransport = new transports.Console({
  level: 'info',
  timestamp: () => new Date().toString(),
  colorize: true,
});
const transport = [consoleTransport];
const logger = { consoleTransport };

if (papertrailActive) {
  const papertrailTransport = new Papertrail({
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    colorize: true,
    program: os.hostname(),
    disableTls: process.env.PAPERTRAIL_DISABLE_TLS === 'true',
  });
  transport.push(papertrailTransport);
  logger.papertrailTransport = papertrailTransport;
} else if (papertrailAutoSetup) {
  const papertrailTransport = new Papertrail({
    host: 'logs3.papertrailapp.com',
    port: 16605,
    colorize: true,
    hostname: process.env.SERVICE_LABEL,
    program: os.hostname(),
  });
  transport.push(papertrailTransport);
  logger.papertrailTransport = papertrailTransport;
}

logger.logger = new Logger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  transports: transport
});


export default logger;
