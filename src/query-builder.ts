class _QueryBuilder {
  private query = '';

  // FIELDS

  public raw(value: string): _QueryBuilder {
    this.concatQuery(value);
    return this;
  }

  public fromTable(database: string, table: string): _QueryBuilder {
    this.concatQuery(`FROM "${database}"."${table}"`);
    return this;
  }

  public select(field: string | string[]): _QueryBuilder {
    this.concatQuery(`SELECT ${Array.isArray(field) ? field.join(',') : field}`);
    return this;
  }

  public selectDistinct(field: string | string[]): _QueryBuilder {
    this.concatQuery(`SELECT DISTINCT ${Array.isArray(field) ? field.join(',') : field}`);
    return this;
  }

  public as(field: string | string[]): _QueryBuilder {
    this.concatQuery(`AS ${Array.isArray(field) ? field.join(',') : field}`);
    return this;
  }

  public where(field: string): _QueryBuilder {
    this.concatQuery(`WHERE ${field}`);
    return this;
  }

  public and(field: string): _QueryBuilder {
    this.concatQuery(`AND ${field}`);
    return this;
  }

  public or(field: string): _QueryBuilder {
    this.concatQuery(`OR ${field}`);
    return this;
  }

  public not(field: string): _QueryBuilder {
    this.concatQuery(`NOT ${field}`);
    return this;
  }

  public on(field: string): _QueryBuilder {
    this.concatQuery(`ON ${field}`);
    return this;
  }

  public groupBy(field: string | string[]): _QueryBuilder {
    this.concatQuery(`GROUP BY ${Array.isArray(field) ? field.join(',') : field}`);
    return this;
  }

  public orderBy(field: string, type: 'ASC' | 'DESC'): _QueryBuilder {
    this.concatQuery(`ORDER BY ${field} ${type}`);
    return this;
  }

  // FILTERS

  public equal(value: string | number | Date): _QueryBuilder {
    this.concatQuery(`= ${this.transformValue(value)}`);
    return this;
  }

  public notEqual(value: string | number | Date): _QueryBuilder {
    this.concatQuery(`!= ${this.transformValue(value)}`);
    return this;
  }

  public lessThan(value: string | number | Date): _QueryBuilder {
    this.concatQuery(`< ${this.transformValue(value)}`);
    return this;
  }

  public greaterThan(value: string | number | Date): _QueryBuilder {
    this.concatQuery(`> ${this.transformValue(value)}`);
    return this;
  }

  public lessThanOrEqual(value: string | number | Date): _QueryBuilder {
    this.concatQuery(`<= ${this.transformValue(value)}`);
    return this;
  }

  public greaterThanOrEqual(value: string | number | Date): _QueryBuilder {
    this.concatQuery(`>= ${this.transformValue(value)}`);
    return this;
  }

  public in(values: string[] | number[]): _QueryBuilder {
    const query = values.map((x) => this.transformValue(x)).join(',');
    this.concatQuery(`IN (${query})`);
    return this;
  }

  public between<T extends string | number | Date>(from: T, to: T): _QueryBuilder {
    this.concatQuery(`BETWEEN ${this.transformValue(from)} AND ${this.transformValue(to)}`);
    return this;
  }

  public build(): string {
    return this.query;
  }

  private concatQuery(query: string): void {
    this.query += `${query} `;
  }

  private transformValue(value: string | number | Date): string {
    return value instanceof Date
      ? `'${value.toISOString().replace('T', ' ').replace('Z', '')}'`
      : typeof value === 'string'
      ? this.addQuotes(value)
      : value.toString();
  }

  private addQuotes(value: string): string {
    return `'${value}'`;
  }
}

export function QueryBuilder(): QueryBuilderType {
  return new _QueryBuilder();
}

export interface QueryBuilderType extends _QueryBuilder {}
