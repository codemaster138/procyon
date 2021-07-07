import {ProcyonType} from '../../types';
import {Input} from '../input';
import {QueryOptions} from '../query';
import express from 'express';

/**
 * Register a mutation
 * @param _name Mutation name
 * @param options Mutation options
 */
export default function mutation(_name: string, options: QueryOptions) {
  return new Mutation(_name, options);
}

export class Mutation {
  name: string;
  options: QueryOptions;

  constructor(_name: string, options: QueryOptions) {
    this.name = _name;
    this.options = options;
  }
}
