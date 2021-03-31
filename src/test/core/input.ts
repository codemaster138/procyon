import test from 'ava';
import input from '../../core/input';
import * as types from '../../types';

test('input returns an Input', t => {
  t.is((input('hello', types.STRING) as any).constructor.name, 'Input');
});
