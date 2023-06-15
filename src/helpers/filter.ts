export class Filter<
  TSingle extends string[] | never,
  TRange extends string[] | never,
> {
  private current: string[] = []

  single(key: TSingle[keyof TSingle], value: string | number): this {
    this.current.push(`${key}=${value}`)
    return this
  }

  range(key: TRange[keyof TRange], from: string, to: string): this {
    this.current.push(`${key}[from]=${from}&${key}[to]=${to}`)
    return this
  }

  toString(): string {
    return this.current.join('&')
  }
}

export type FilterLike<
  TSingle extends string[] | never,
  TRange extends string[] | never,
> =
  | Filter<TSingle, TRange>
  | ((
    filter: Filter<TSingle, TRange>,
  ) => Filter<TSingle, TRange>)

export function filterLikeToString<
  TSingle extends string[] | never,
  TRange extends string[] | never,
>(filter_like: FilterLike<TSingle, TRange>): string {
  if (filter_like instanceof Filter)
    return filter_like.toString()
  return filter_like(new Filter()).toString()
}
