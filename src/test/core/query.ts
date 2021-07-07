import test from 'ava';
import query from '../../core/query';
import * as types from '../../types';

test('query returns a Query', t => {
  t.is((query('hello', {output: types.STRING, resolver: ((args: any): string => 'Hello world')}) as any).constructor.name, 'Query');
});
