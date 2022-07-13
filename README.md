# @dustfoundation/timestream-kit

![CI](https://github.com/DustFoundation/timestream-kit/actions/workflows/ci.yml/badge.svg)
[![NPM Version](https://badgen.net/npm/v/@dustfoundation/timestream-kit)](https://npmjs.com/package/@dustfoundation/timestream-kit)
[![Minimum Node.js Version](https://badgen.net/npm/node/@dustfoundation/timestream-kit)](https://npmjs.com/package/@dustfoundation/timestream-kit)

**Timestream Kit** for fast development.

## Installation

```sh
npm install --save @dustfoundation/timestream-kit
```

## Usage

### Query Builder

```ts
QueryBuilder()
  .select('*')
  .from('databaseName', 'tableName')
  .where('id')
  .in([1, 2])
  .and('time')
  .between(new Date('2022-01-01'), new Date('2022-01-02'))
  .orderBy('time', 'DESC')
  .build();
// =>
// SELECT * FROM "databaseName"."tableName"
// WHERE id IN (1,2)
// AND time BETWEEN '2022-01-01 00:00:00.000' AND '2022-01-02 00:00:00.000'
// ORDER BY time DESC
```
