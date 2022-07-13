class _QueryBuilder {
  private query = '';

  // FIELDS

  public select(field: string | string[]): _QueryBuilder {
    this.concatQuery(`SELECT ${Array.isArray(field) ? field.join(',') : field}`);
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

  public orderBy(field: string, type: 'ASC' | 'DESC'): _QueryBuilder {
    this.concatQuery(`ORDER BY ${field} ${type}`);
    return this;
  }

  // FILTERS

  public from(database: string, table: string): _QueryBuilder {
    this.concatQuery(`FROM "${database}"."${table}"`);
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

export function QueryBuilder(): _QueryBuilder {
  return new _QueryBuilder();
}
