// deno-lint-ignore no-explicit-any
export function query(params?: any): string {
  if (params === undefined || params === null)
    return ''

  const result: string[] = []

  function handleNestedQuery(itemKey: string, itemValue: any) {
    if (itemValue !== null && typeof itemValue === 'object') {
      for (const key in itemValue)
        handleNestedQuery(`${itemKey}[${key}]`, itemValue[key])
    }
    else {
      result.push(`${encodeURIComponent(itemKey)}=${encodeURIComponent(String(itemValue))}`)
    }
  }

  for (const key in params)
    handleNestedQuery(key, params[key])

  return result.filter(item => item !== '').join('&')
}
