# GetCourse JS SDK

[![npm](https://img.shields.io/npm/v/getcourse-js-sdk?logo=npm&style=flat&labelColor=000)](https://www.npmjs.com/package/getcourse-js-sdk)
[![license](https://img.shields.io/github/license/belyaev-dev/getcourse-js-sdk?style=flat&labelColor=000)](https://github.com/belyaev-dev/getcourse-js-sdk/blob/main/LICENSE)

Simple [GetCourse.ru](http://getcourse.ru) API client for JavaScript.
Based on [@shevernitskiy/amo](https://github.com/shevernitskiy/amo)

## Usage

### Installation

<img height='18' src='https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/nodejs.svg'> Node.JS

```powershell
npm i getcourse-js-sdk
```

### Basic example

```ts
import { FormatError, GetCourse, ServerError } from 'getcourse-js-sdk'

try {
  const gc = new GetCourse('belyaevdev.getcourse.ru', 'longapitoken')

  const res = await gc.user.addUser({
    user: {
      email: 'test@mail.ru',
    },
  })

  console.log(res)
}
catch (err) {
  if (err instanceof FormatError || err instanceof ServerError)
    console.error(err.response)
  else console.error(err)
}
```

### Export example

```ts
import { FormatError, GetCourse, ServerError } from 'getcourse-js-sdk'
import type { ExportApiResponse, ExportedData } from 'getcourse-js-sdk'

async function checkExport(
  gc: GetCourse,
  exportId: number
): Promise<ExportApiResponse<ExportedData>> {
  const result = await gc.account.getExportResult(exportId)

  if (result.error_code && result.error_code === 909) {
    // If the error_code is 909, wait for 10 seconds and then retry
    console.log('Export not ready, retrying in 10 seconds...')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(checkExport(gc, exportId))
      }, 10000) // retry after 10 seconds
    })
  }
  return result
}

// Helper function that maps GetCourse export format to simple JSON object
function mapExportedData(
  response: ExportApiResponse<ExportedData>
): Record<string, string>[] {
  const { fields, items } = response.info
  return items.map((item: any) => {
    const mappedItem: Record<string, string> = {}
    item.forEach((value: any, index: any) => {
      mappedItem[fields[index]] = value
    })
    return mappedItem
  })
}

try {
  const gc = new GetCourse('belyaevdev.getcourse.ru', 'longapitoken')
  const exportResponse = await gc.account.exportUsers({
    created_at: {
      from: '2022-06-16',
      to: '2023-06-16',
    },
  })

  const exportResult = await checkExport(gc, exportResponse.info.export_id)

  const mappedExport = mapExportedData(exportResult)

  console.log(mappedExport)
}
catch (err) {
  if (err instanceof FormatError || err instanceof ServerError)
    console.error(err.response)
  else console.error(err)
}
```

## Configuration

### TS Config Base

[tsconfig.json](https://github.com/tsconfig/bases/tree/main/bases) is used as the base config for the Typescript compiler.

## Contribution

We welcome contributions! If you'd like to contribute, feel free to fork this repository, make your changes, and then submit a pull request.

## Support

If you encounter any problems or have any questions, you can create an issue on the [GitHub issues page](https://github.com/belyaev-dev/getcourse-js-sdk/issues).

## Sponsors

[DotSales](https://dotsales.ru)

## License

This project is licensed under the [MIT License](LICENSE).
