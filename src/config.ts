import dotenv from 'dotenv';
import path from 'path';
if (!process.env.dotenvLoaded) {
  dotenv.config({ path: `./${process.env.ENV || ''}.env` });
  process.env.dotenvLoaded = 'y';
}

const environment = process.env.ENV || 'local';
const isTSNode = (() => {
  const lastArg = process.execArgv[process.execArgv.length - 1];
  if (lastArg && path.parse(lastArg).name.indexOf('ts-node') >= 0) {
    return true;
  }
  return !!process[Symbol.for('ts-node.register.instance')];
})();

export interface Config {
  [key: string]: number | boolean | string | string[];
  port: number;
  dbsslconn: boolean;
  jwtSecret: string;
  environment: string;
  isTSNode: boolean;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_ENTITIES_PATH: string[];
  REDIS_HOST: string;
  REDIS_PORT: number;
  PM2_INSTANCE_NUM: number;
  PM2_INDEX: number;
}

const config: Config = {
  port: +(process.env.PORT || 4000),
  dbsslconn: false,
  jwtSecret: process.env.JWT_SECRET || 'Example',
  environment,
  isTSNode,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '5433',
  DB_USER: process.env.DB_USER || 'user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'pass',
  DB_NAME: process.env.DB_NAME || 'project',
  DB_ENTITIES_PATH: [...(isTSNode ? ['src/entity/*.ts'] : ['dist/entity/*.js'])],
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: +(process.env.REDIS_PORT || '6380'),
  PM2_INSTANCE_NUM: process.env.ENV !== 'production' ? 1 : 4,
  PM2_INDEX: parseInt(process.env.pm_id, 10) || 0,
};

export { config };
