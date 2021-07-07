import {ProcyonType} from '../../types';
import {Input} from '../input';
import express from 'express';

/**
 * Query options
 */
export interface QueryOptions {
  /**
   * Array of inputs
   */
  inputs?: Input[];
  /**
   * Return type
   */
  output: ProcyonType;
  /**
   * Resolver function
   */
  resolver: (args: any) => void;
}

/**
 * Register a query
 * @param _name Query name
 * @param options Query options
 */
export default function query(_name: string, options: QueryOptions) {
  return new Query(_name, options);
}

export class Query {
  name: string;
  options: QueryOptions;

  constructor(_name: string, options: QueryOptions) {
    this.name = _name;
    this.options = options;
  }
}
