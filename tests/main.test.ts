import * as assert from 'assert';
import pickv from '..';

class A {
  a = 1;
  b = 2;
  c = 3;
}

class B {
  a = -1;
  b = -2;
  c = -3;
}

const filter = {
  A: ['a', 'b'],
  B: ['c'],
};

it('Start with an object', () => {
  assert.deepStrictEqual(
    pickv(
      {
        p1: {
          p1: new A(),
          p2: [1, 2, new B()],
        },
        p2: [
          {
            p1: new B(),
          },
        ],
      },
      filter,
    ),
    {
      p1: {
        p1: { a: 1, b: 2 },
        p2: [1, 2, { c: -3 }],
      },
      p2: [
        {
          p1: { c: -3 },
        },
      ],
    },
  );
});

it('Start with an array', () => {
  assert.deepStrictEqual(
    pickv(
      [
        new A(),
        null,
        {
          p1: {
            p1: new A(),
            p2: [1, 2, new B()],
          },
          p2: [
            {
              p1: new B(),
            },
          ],
        },
      ],
      filter,
    ),
    [
      { a: 1, b: 2 },
      null,
      {
        p1: {
          p1: { a: 1, b: 2 },
          p2: [1, 2, { c: -3 }],
        },
        p2: [
          {
            p1: { c: -3 },
          },
        ],
      },
    ],
  );
});

it('Other values', () => {
  const date = new Date();
  // eslint-disable-next-line object-shorthand
  assert.deepStrictEqual(pickv({ date, null: null, undefined: undefined }, filter), {
    date,
    null: null,
    // eslint-disable-next-line object-shorthand
    undefined: undefined,
  });
});
