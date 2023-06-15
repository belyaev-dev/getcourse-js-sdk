# GetCourse JS SDK

[![npm](https://img.shields.io/npm/v/getcourse-js-sdk?logo=npm&style=flat&labelColor=000)](https://www.npmjs.com/package/getcourse-js-sdk)
[![license](https://img.shields.io/github/license/belyaev-dev/getcourse-js-sdk?style=flat&labelColor=000)](https://github.com/belyaev-dev/getcourse-js-sdk/blob/main/LICENSE)


Simple [GetCourse.ru](http://getcourse.ru) API client for JavaScript.
Based on [@shevernitskiy/amo](https://github.com/shevernitskiy/amo)


## Usage

### Installation

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/nodejs.svg"> Node.JS

```powershell
npm i getcourse-js-sdk
```

### Basic example

```ts
import { GetCourse, ServerError, TokenError } from 'getcourse-js-sdk'

try {
  const gc = new GetCourse('belyaevdev.getcourse.ru', 'longapitoken')

  const res = await gc.user.addUser({
    user: {
      email: 'test@mail.ru',
    }
  })

  console.log(res)
}
catch (err) {
  if (err instanceof FormatError || err instanceof ServerError)
    console.error(err.response)
  else
    console.error(err)
}
```

## Configuration

### TS Config Base

[tsconfig.json](https://github.com/tsconfig/bases/tree/main/bases) is used as the base config for the Typescript compiler.

## Contribution

We welcome contributions! If you'd like to contribute, feel free to fork this repository, make your changes, and then submit a pull request.

## Support

If you encounter any problems or have any questions, you can create an issue on the [GitHub issues page](https://github.com/belyaev-dev/getcourse-js-sdk/issues).

## License

This project is licensed under the [MIT License](LICENSE).