export class QueryBuilder {
  private readonly query = []

  private addStep (step: string, data: object): QueryBuilder {
    this.query.push({
      [step]: data
    })
    return this
  }

  match (data: object): QueryBuilder {
    this.addStep('$match', data)
    return this
  }

  group (data: object): QueryBuilder {
    this.addStep('$group', data)
    return this
  }

  sort (data: object): QueryBuilder {
    this.addStep('$sort', data)
    return this
  }

  unwind (data: object): QueryBuilder {
    this.addStep('$unwind', data)
    return this
  }

  lookup (data: object): QueryBuilder {
    this.addStep('$lookup', data)
    return this
  }

  project (data: object): QueryBuilder {
    this.addStep('$project', data)
    return this
  }

  build (): object[] {
    return this.query
  }
}
