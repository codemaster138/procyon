import test from 'ava';
import {trycatch, env} from '../utils';

test('trycatch returns result of a if no error is thrown', t => {
  t.is(
    trycatch(
      () => 'hello world',
      () => 'goodbye world'
    ),
    'hello world'
  );
});

test('trycatch passes the error from a to b', t => {
  trycatch(
    () => {
      throw new Error('foo bar baz buzz');
    },
    error => {
      t.is(error.message, 'foo bar baz buzz');
    }
  );
});

test('trycatch returns the result from b if an error is thrown', t => {
  t.is(
    trycatch(
      () => {
        throw new Error('fizz');
      },
      () => 'foo bar'),
    'foo bar'
  );
});

test('trycatch doesn\'t catch errors from b', t => {
  try {
    trycatch(
      () => {
        throw new Error('fizz');
      },
      () => {
        throw new Error('baz buzz');
      });
    t.fail();
  } catch (error: any) {
    t.is(error?.message, 'baz buzz');
  }
});

test('env reads an environment variable', t => {
  process.env.foo = 'hi';
  t.is(env('foo'), process.env.foo);
  process.env.foo = undefined;
});

test('env falls back', t => {
  t.is(env('bar', 72), 72);
});

test('env.int deserializes numbers', t => {
  process.INT_I = '5';
  t.is(env.int('INT_I'), 5);
});

test('env.int falls back', t => {
  t.is(env.int('INT_II', 7), 7);
});

test('env.float deserializes numbers', t => {
  process.FLOAT_I = '72.5';
  t.is(env.float('FLOAT_I'), 72.5);
});

test('env.float falls back', t => {
  t.is(env.float('FLOAT_II', 72.375), 72.375);
});

test('env.boolean deserializes bools', t => {
  process.env.BOOL_I = 'true';
  t.is(env.boolean('BOOL_I'), true);
  process.env.BOOL_II = 'false';
  t.is(env.boolean('BOOL_II'), false);
});

test('env.boolean falls back', t => {
  t.is(env.boolean('BOOL_III', true), true);
});
