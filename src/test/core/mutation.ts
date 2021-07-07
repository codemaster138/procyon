import test from 'ava';
import mutation from '../../core/mutation';
import * as types from '../../types';

test('mutation returns a Mutation', t => {
  t.is((mutation('hello', {output: types.STRING, resolver: ((args: any): string => 'Hello world')}) as any).constructor.name, 'Mutation');
});
