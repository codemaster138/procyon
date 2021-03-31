import * as types from '../../types';
import {Query} from '../query';
import {Mutation} from '../mutation';

export class MutableInterface {
  interface: {[key: string]: ProcyonType};
  type: ProcyonType;
  name: string;

  constructor(name: string, interface?: {[key: string]: ProcyonType}) {
    this.interface = interface ?? {};
    this.name = name;
    this.type = types.INTERFACE(this.name, this.interface);
  }

  addKey(key: string, type: ProcyonType) {
    this.interface[key] = type;
    this.type = types.INTERFACE(this.name, this.interface);
  }

  removeKey(key: string) {
    delete this.interface[key];
    this.type = types.INTERFACE(this.name, this.interface);
  }
}

/**
 * This class is used to build a procyon schema
 */
export default class ProcyonSchema {
  types: {[key: string]: types.ProcyonType};

  constructor() {
    this.types = {};
    this.types.Query = new MutableInterface();
    this.types.Mutation = new MutableInterface();
  }

  addQuery(query: Query) {
    this.types.Query.addKey(query.name, query.options.output);
    this.register(query.options.output);
    query.options.input?.forEach(input => {
      this.register(input.type);
    });
  }

  /*
   * Register a procyon type
   */
  register(_type: types.ProcyonType) {
    if (!_type.schema) return; // Primitives need not be registered
    if (this.types[_type.name]) return; // Prevents registering the same type twice
    this.types[_type.name] = _type;
  }

  generateSchema() {
    this.types.Query = this.types.Query.type || this.types.Query;
    this.types.Mutation = this.types.Mutation.type || this.types.Mutation;
    return this.types.map(t => t.schema).join('\n\n');
  }
}
