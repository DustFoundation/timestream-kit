import { expect } from 'chai';
import { QueryBuilder } from './query-builder';

describe('QueryBuilder', () => {
  // FIELDS

  it('select(string)', () => {
    const query = QueryBuilder().select('id').build();
    expect(query).eql('SELECT id ');
  });
  it('select(string[])', () => {
    const query = QueryBuilder().select(['id', 'name']).build();
    expect(query).eql('SELECT id,name ');
  });

  it('as(string)', () => {
    const query = QueryBuilder().as('id').build();
    expect(query).eql('AS id ');
  });
  it('as(string[])', () => {
    const query = QueryBuilder().as(['id', 'name']).build();
    expect(query).eql('AS id,name ');
  });

  it('where(string)', () => {
    const query = QueryBuilder().where('id').build();
    expect(query).eql('WHERE id ');
  });

  it('and(string)', () => {
    const query = QueryBuilder().and('id').build();
    expect(query).eql('AND id ');
  });

  it('or(string)', () => {
    const query = QueryBuilder().or('id').build();
    expect(query).eql('OR id ');
  });

  it('not(string)', () => {
    const query = QueryBuilder().not('id').build();
    expect(query).eql('NOT id ');
  });

  it('groupBy(string)', () => {
    const query = QueryBuilder().groupBy('id').build();
    expect(query).eql('GROUP BY id ');
  });
  it('groupBy(string[])', () => {
    const query = QueryBuilder().groupBy(['id', 'name']).build();
    expect(query).eql('GROUP BY id,name ');
  });

  it('orderBy(string, ASC)', () => {
    const query = QueryBuilder().orderBy('id', 'ASC').build();
    expect(query).eql('ORDER BY id ASC ');
  });
  it('orderBy(string, DESC)', () => {
    const query = QueryBuilder().orderBy('id', 'DESC').build();
    expect(query).eql('ORDER BY id DESC ');
  });

  // FILTERS

  it('equal(string)', () => {
    const query = QueryBuilder().equal('value').build();
    expect(query).eql("= 'value' ");
  });
  it('equal(number)', () => {
    const query = QueryBuilder().equal(1).build();
    expect(query).eql('= 1 ');
  });
  it('equal(Date)', () => {
    const query = QueryBuilder().equal(new Date('2022-01-01')).build();
    expect(query).eql("= '2022-01-01 00:00:00.000' ");
  });

  it('notEqual(string)', () => {
    const query = QueryBuilder().notEqual('value').build();
    expect(query).eql("!= 'value' ");
  });
  it('notEqual(number)', () => {
    const query = QueryBuilder().notEqual(1).build();
    expect(query).eql('!= 1 ');
  });
  it('notEqual(Date)', () => {
    const query = QueryBuilder().notEqual(new Date('2022-01-01')).build();
    expect(query).eql("!= '2022-01-01 00:00:00.000' ");
  });

  it('lessThan(string)', () => {
    const query = QueryBuilder().lessThan('value').build();
    expect(query).eql("< 'value' ");
  });
  it('lessThan(number)', () => {
    const query = QueryBuilder().lessThan(1).build();
    expect(query).eql('< 1 ');
  });
  it('lessThan(Date)', () => {
    const query = QueryBuilder().lessThan(new Date('2022-01-01')).build();
    expect(query).eql("< '2022-01-01 00:00:00.000' ");
  });

  it('lessThanOrEqual(string)', () => {
    const query = QueryBuilder().lessThanOrEqual('value').build();
    expect(query).eql("<= 'value' ");
  });
  it('lessThanOrEqual(number)', () => {
    const query = QueryBuilder().lessThanOrEqual(1).build();
    expect(query).eql('<= 1 ');
  });
  it('lessThanOrEqual(Date)', () => {
    const query = QueryBuilder().lessThanOrEqual(new Date('2022-01-01')).build();
    expect(query).eql("<= '2022-01-01 00:00:00.000' ");
  });

  it('greaterThan(string)', () => {
    const query = QueryBuilder().greaterThan('value').build();
    expect(query).eql("> 'value' ");
  });
  it('greaterThan(number)', () => {
    const query = QueryBuilder().greaterThan(1).build();
    expect(query).eql('> 1 ');
  });
  it('greaterThan(Date)', () => {
    const query = QueryBuilder().greaterThan(new Date('2022-01-01')).build();
    expect(query).eql("> '2022-01-01 00:00:00.000' ");
  });

  it('greaterThanOrEqual(string)', () => {
    const query = QueryBuilder().greaterThanOrEqual('value').build();
    expect(query).eql(">= 'value' ");
  });
  it('greaterThanOrEqual(number)', () => {
    const query = QueryBuilder().greaterThanOrEqual(1).build();
    expect(query).eql('>= 1 ');
  });
  it('greaterThanOrEqual(Date)', () => {
    const query = QueryBuilder().greaterThanOrEqual(new Date('2022-01-01')).build();
    expect(query).eql(">= '2022-01-01 00:00:00.000' ");
  });

  it('from(database, table)', () => {
    const query = QueryBuilder().from('database', 'table').build();
    expect(query).eql('FROM "database"."table" ');
  });

  it('in(string[])', () => {
    const query = QueryBuilder().in(['value1', 'value2']).build();
    expect(query).eql("IN ('value1','value2') ");
  });
  it('in(number[])', () => {
    const query = QueryBuilder().in([1, 2]).build();
    expect(query).eql('IN (1,2) ');
  });

  it('between(string, string)', () => {
    const query = QueryBuilder().between('1', '2').build();
    expect(query).eql("BETWEEN '1' AND '2' ");
  });
  it('between(number, number)', () => {
    const query = QueryBuilder().between(1, 2).build();
    expect(query).eql('BETWEEN 1 AND 2 ');
  });
  it('between(Date, Date)', () => {
    const query = QueryBuilder().between(new Date('2022-01-01'), new Date('2022-01-02')).build();
    expect(query).eql("BETWEEN '2022-01-01 00:00:00.000' AND '2022-01-02 00:00:00.000' ");
  });

  it('build() with queries', () => {
    const query = QueryBuilder()
      .select('*')
      .from('databaseName', 'tableName')
      .where('id')
      .in([1, 2])
      .and('time')
      .between(new Date('2022-01-01'), new Date('2022-01-02'))
      .orderBy('time', 'DESC')
      .build();
    expect(query).eql(
      `SELECT * FROM "databaseName"."tableName" WHERE id IN (1,2) AND time BETWEEN '2022-01-01 00:00:00.000' AND '2022-01-02 00:00:00.000' ORDER BY time DESC `,
    );
  });

  it('build() with no queries', () => {
    const query = QueryBuilder().build();
    expect(query).eql('');
  });
});
