import {env} from '../utils';
import ProcyonSchema from './schema';
import express from 'express';

export interface ProcyonCoreConfig {
  port?: number;
}

/**
 * This is the core of the procyon server.
 * This code is shared between the testing
 * and actual procyon server.
 */
export default class ProcyonCore {
  port: number;
  app: express.Express;
  /**
   * Once this value turns true,
   * new resolvers can no longer
   * be registered on a procyon
   * instance.
   */
  started = false;

  constructor(config?: ProcyonCoreConfig) {
    this.port = config?.port ?? env('PORT', 4400);
    this.app = express();
    this.schema = new ProcyonSchema();
    this.app.get('/', (_: express.Request, response: express.Response) => { // This endpoint exists solely for testing purposes
      response.end('Procyon Server');
    });
  }

  async listen() {
    return new Promise(resolve => {
      this.app.listen({port: this.port}, () => {
        resolve(this.port);
      });
    });
  }
}
