/* eslint-disable no-console */
import { isProduction } from './platforms';

const shouldDebug = !isProduction();
const prefix = 'Foos';

export const info = (...args: Array<any>) => {
  console.info(`[${prefix}]: `, ...args);
};

export const log = (...args: Array<any>) => {
  if (shouldDebug) console.log(`[${prefix}]: `, ...args);
};

export const warn = (...args: Array<any>) => {
  if (shouldDebug) console.warn(`[${prefix}]: `, ...args);
};

export const error = (...args: Array<any>) => {
  if (shouldDebug) console.error(`[${prefix}]: `, ...args);
};
