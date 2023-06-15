// deno-lint-ignore no-explicit-any
export function query(params?: any): string {
  if (params === undefined || params === null)
    return ''

  const result: string[] = []

  const common = new URLSearchParams(
    Object.entries(params)
      .map<string[]>(item => [item[0], String(item[1])]),
  ).toString()

  if (common !== '')
    result.push(common)

  return result.filter(item => item !== '').join('&')
}
