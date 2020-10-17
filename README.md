# pickv

Pick object properties recursively based on type names.

## Installation

```sh
yarn add pickv
```

## Usage

```ts
import pickv from 'pickv';

class A {
  constructor() {
    this.a = 1;
    this.b = 2;
    this.c = 3;
  }
}

pickv(
  {
    prop: 'hello',
    nested: {
      array: [new A(), { a: 1, b: 2 }],
    },
  },
  {
    // Pick a set of properties from type A.
    A: ['b', 'c'],
  },
);
/*
  Prints:
  {
    prop: 'hello',
    nested: {
      array: [{ b: 2, c: 3 }, { a: 1, b: 2 }],
    },
  }
*/
```
