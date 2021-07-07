import test from 'ava';
import ProcyonCore from '../../core';
import axios from 'axios';

test('Core starts a server on port 4400', async t => {
  const core = new ProcyonCore();
  await core.listen();

  await axios.get('http://localhost:4400/').catch((error: any) => {
    t.fail();
  });
  t.pass();
});
