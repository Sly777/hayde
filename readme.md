# Hayde

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
[![GitHub](https://img.shields.io/github/license/sly777/hayde)](https://github.com/sly777/hayde/blob/main/LICENSE)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/sly777/hayde)](https://github.com/sly777/hayde/pulse)
[![GitHub last commit](https://img.shields.io/github/last-commit/sly777/hayde)](https://github.com/sly777/hayde/commits/main)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Sly777_hayde&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Sly777_hayde&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Sly777_hayde&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Sly777_hayde&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Sly777_hayde&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)
[![Known Vulnerabilities](https://snyk.io/test/github/Sly777/hayde/badge.svg)](https://snyk.io/test/github/Sly777/hayde)
[![npm version](https://badge.fury.io/js/hayde.svg)](https://badge.fury.io/js/hayde)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Sly777_hayde)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)

Hayde is a CLI tool that allows you to create React components quickly and easily. With Hayde, you can focus on writing code instead of setting up boilerplate files.

<img src="https://github.com/Sly777/hayde/assets/694940/32e70b96-ed25-4897-95c4-76b7500bd925" width="300" alt="Hayde Quick Start" />

## Quick Start

To use Hayde, simply run the following command:

```bash
npx hayde
```

This will launch the CLI tool and guide you through the process of creating a new React component.

## Features

- **Quick and Easy** 🚀 - Hayde allows you to create React components quickly and easily. With Hayde, you can focus on writing code instead of setting up boilerplate files.
- **Clean DX** ⭐ - Hayde is designed to be as simple as possible. It doesn't require any configuration or setup, so you can start using it right away. It's built with TypeScript.
- **Customizable** 🪄 - Hayde is highly customizable. You can configure it to suit your needs and preferences.
- **Modular** 🧩 - Hayde is modular. You can use it with any React project (create-react-app, next.js, astro, ...etc.), regardless of its size or complexity. Also it's easy to extend Hayde with new features.
- **No Installation Required** 📦 - Hayde doesn't require any installation. You can use it right away without having to install anything.

## Table of Contents

- [Hayde](#hayde)
  - [Quick Start](#quick-start)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Settings](#settings)
  - [Examples](#examples)
  - [Supported Libraries on Component Creation](#supported-libraries-on-component-creation)
  - [NPM Scripts](#npm-scripts)
  - [CLI Arguments](#cli-arguments)
  - [How to create custom plugin](#how-to-create-custom-plugin)
  - [Contributing](#contributing)
  - [License](#license)

## Settings

There are two options for running Hayde. Just simply run `npx hayde` or You can also run Hayde with `.hayde.json` file. This file allows you to specify default options for Hayde. 

Here's an example of what the .hayde.json file might look like:

```json
{
  "plugins": [
    {
      "name": "general",
      "options": {
        "srcFolderLocation": "./src"
      }
    },
    "css",
    {
      "name": "reactJS",
      "options": {
        "createInterface": true,
        "styleLibrary": "chakraUI"
      }
    },
    "chakraUI"
  ]
}


```

This file sets the default options for Hayde to avoid having to enter them every time you run the tool. And when you create a new component, Hayde will create react component with Chakra UI and interface support on `./src` folder.

After creating `.hayde.json` file, you can run Hayde with the following command:

```bash
npx hayde
```

For more information on the available options, please check the [options](./docs/options.md) page.

## Examples

For Examples, please check the [examples](./examples) folder. You can just copy JSON files from this folder and paste to root folder of your project. Then you can just run Hayde.

## Supported Libraries on Component Creation

You can create React components with the following libraries, you just need to add the library name to the plugins array in the `.hayde.json` file.

- [Chakra UI](https://chakra-ui.com/) - [Source](./src/features/chakraUI/)
- [Material UI](https://material-ui.com/) - [Source](./src/features/materialUI/)
- [Emmet](https://emmet.io/) - [Source](./src/features/emmet/)
- [Storybook](https://storybook.js.org/) - [Source](./src/features/storybook/)
- [Builder.io](https://www.builder.io/) - [Source](./src/features/builderIO/)
- [React.js](https://reactjs.org/) - [Source](./src/features/reactJS/)
- CSS and SCSS support - [Source](./src/features/css/)
- [TypeScript](https://www.typescriptlang.org/)

## NPM Scripts

For NPM Scripts, please check the [npm scripts](./docs/npm-scripts.md) page. You can use Hayde with npm scripts easily.

## CLI Arguments

For CLI Arguments, please check the [CLI arguments](./docs/cli-arguments.md) page.

## How to create custom plugin

For creating custom plugin, please check the [custom plugin](./docs/how-to-create-custom-plugin.md) page. You can create your own libraries' plugin easily with extensive functionally and [Handlebars](https://handlebarsjs.com/) template engine.

Also; you can create your hayde plugin with hayde. Just update your `.hayde.json` file like below:

```json
{
  "plugins": [
    "createPlugin"
  ]
}
```

then run the following command:

```bash
npx hayde
```

## Contributing

If you'd like to contribute to Hayde, please check the [contributing](./docs/contributing.md) page. Contributions are always welcome! 

If you want to integrate your library/plugin/boilerplate to Hayde, please check the [how to create custom plugin](./docs/how-to-create-custom-plugin.md) page.

## License

Distributed under the GPL-3.0 License. See [LICENSE](LICENSE) for more information.
