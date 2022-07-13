import { expect } from 'chai';
import { QueryBuilder } from './query-builder';

describe('QueryBuilder', () => {
  it('select(string)', () => {
    const query = QueryBuilder().select('id').build();
    expect(query).eql('SELECT id ');
  });

  it('select(string[])', () => {
    const query = QueryBuilder().select(['id', 'name']).build();
    expect(query).eql('SELECT id,name ');
  });

  it('where(string)', () => {
    const query = QueryBuilder().where('id').build();
    expect(query).eql('WHERE id ');
  });

  it('and(string)', () => {
    const query = QueryBuilder().and('id').build();
    expect(query).eql('AND id ');
  });

  it('orderBy(string, ASC)', () => {
    const query = QueryBuilder().orderBy('id', 'ASC').build();
    expect(query).eql('ORDER BY id ASC ');
  });

  it('orderBy(string, DESC)', () => {
    const query = QueryBuilder().orderBy('id', 'DESC').build();
    expect(query).eql('ORDER BY id DESC ');
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
