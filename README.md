# Hayde

![](https://github.com/Sly777/hayde/assets/694940/c28e8507-eae9-4e9a-99f9-9a2f4487c79a)

Hayde is CLI tool transforms React component creation, supporting frameworks like ChakraUI, MaterialUI, and leveraging AI tools like OpenAI and Ollama for smart, efficient coding. Perfect for developers seeking a fast, intuitive code generation experience.

***

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code\_of\_conduct.md) [![GitHub](https://img.shields.io/github/license/sly777/hayde)](https://github.com/sly777/hayde/blob/main/LICENSE) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/sly777/hayde)](https://github.com/sly777/hayde/pulse) [![GitHub last commit](https://img.shields.io/github/last-commit/sly777/hayde)](https://github.com/sly777/hayde/commits/main) [![Reliability Rating](https://sonarcloud.io/api/project\_badges/measure?project=Sly777\_hayde\&metric=reliability\_rating)](https://sonarcloud.io/summary/new\_code?id=Sly777\_hayde) [![Vulnerabilities](https://sonarcloud.io/api/project\_badges/measure?project=Sly777\_hayde\&metric=vulnerabilities)](https://sonarcloud.io/summary/new\_code?id=Sly777\_hayde) [![Security Rating](https://sonarcloud.io/api/project\_badges/measure?project=Sly777\_hayde\&metric=security\_rating)](https://sonarcloud.io/summary/new\_code?id=Sly777\_hayde) [![Maintainability Rating](https://sonarcloud.io/api/project\_badges/measure?project=Sly777\_hayde\&metric=sqale\_rating)](https://sonarcloud.io/summary/new\_code?id=Sly777\_hayde) [![Lines of Code](https://sonarcloud.io/api/project\_badges/measure?project=Sly777\_hayde\&metric=ncloc)](https://sonarcloud.io/summary/new\_code?id=Sly777\_hayde) [![Known Vulnerabilities](https://snyk.io/test/github/Sly777/hayde/badge.svg)](https://snyk.io/test/github/Sly777/hayde) [![npm version](https://badge.fury.io/js/hayde.svg)](https://badge.fury.io/js/hayde) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Sly777_hayde&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Sly777_hayde)

![Hayde Quick Start](https://github.com/Sly777/hayde/assets/694940/dd7aa686-1c59-444f-98a5-490eaef8e86b)

### Quick Start

To use Hayde, simply run the following command:

```bash
npx hayde@latest
```

This will launch the CLI tool and guide you through the process of creating a new React component.

**Local Installation**

If you want to install Hayde locally, you can run the following command:

```bash
npm install hayde --save-dev
```

or

```bash
yarn add hayde --dev
```

**Online Demo**

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/p/sandbox/react-vite-ts-with-hayde-n3ktql)

### Features

* **Quick and Easy** 🚀 - Hayde allows you to create React components quickly and easily. With Hayde, you can focus on writing code instead of setting up boilerplate files.
* **Clean DX** ⭐ - Hayde is designed to be as simple as possible. It doesn't require any configuration or setup, so you can start using it right away. It's built with TypeScript.
* **Customizable** 🪄 - Hayde is highly customizable. You can configure it to suit your needs and preferences.
* **Modular** 🧩 - Hayde is modular. You can use it with any React project (create-react-app, next.js, astro, ...etc.), regardless of its size or complexity. Also it's easy to extend Hayde with new features.
* **No Installation Required** 📦 - Hayde doesn't require any installation. You can use it right away without having to install anything.
* **Auto Import** ⏩ - Hayde automatically imports your components into your project if you want. You just need to add tags into target file and voila! You can check it on [BuilderIO](src/features/builderIO/) integration.
* **AI Support** 🤖 - Hayde supports AI tools such as OpenAI (gpt-3.5 & gpt-4) and Ollama. You can create your components with AI easily! You can check it on [AI](src/features/AI/) integration. **It also supports GPT-4 Vision with URL and File Upload!**

### Table of Contents

* [Hayde](./#hayde)
  * [Quick Start](./#quick-start)
    * [Local Installation](./#local-installation)
    * [Online Demo](./#online-demo)
  * [Features](./#features)
  * [Table of Contents](./#table-of-contents)
  * [Settings](./#settings)
  * [Profiles](./#profiles)
  * [Examples](./#examples)
  * [Supported Libraries on Component Creation](./#supported-libraries-on-component-creation)
  * [NPM Scripts](./#npm-scripts)
  * [CLI Arguments](./#cli-arguments)
  * [How to create custom plugin](./#how-to-create-custom-plugin)
  * [Contributing](./#contributing)
  * [License](./#license)

### Settings

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

or if you want to use AI only with hayde, you can use `.hayde.json` file like below:

```json
{
  "plugins": [
    "general",
    "AI"
  ]
}
```

This file sets the default options for Hayde to avoid having to enter them every time you run the tool. And when you create a new component, Hayde will create react component with Chakra UI and interface support on `./src` folder.

After creating `.hayde.json` file, you can run Hayde with the following command:

```bash
npx hayde
```

For more information on the available options, please check the [options](docs/options.md) page.

### Profiles

If you want to have multiple `.hayde` file, you can just create the file with your profile. For example; you can create two files called `.hayde.json` and `.hayde.ai.json`. And then you can run the following command to use the `.hayde.ai.json` file.

```bash
npx hayde --profile ai
```

### Examples

For Examples, please check the [examples](examples/) folder. You can just copy JSON files from this folder and paste to root folder of your project. Then you can just run Hayde. Some examples are;

* [React Component with Chakra UI](examples/with-react-chakraui.json)
* [React Component with Material UI](examples/with-react-materialui.json)
* [Component with AI (OpenAI GPT-4)](examples/with-openai-gpt-4.json)
* [Using Ollama with llama2](examples/with-ollama-llama2.json)
* [Component with AI Image Recognition (OpenAI GPT-4 Vision)](examples/with-openai-vision.json)

You can find more examples in the [examples](examples/) folder.

### Supported Libraries on Component Creation

You can create React components with the following libraries, you just need to add the library name to the plugins array in the `.hayde.json` file.

* [Chakra UI](https://chakra-ui.com/) - [Source](src/features/chakraUI/)
* [Material UI](https://material-ui.com/) - [Source](src/features/materialUI/)
* [Emmet](https://emmet.io/) - [Source](src/features/emmet/)
* [Storybook](https://storybook.js.org/) - [Source](src/features/storybook/)
* [Builder.io](https://www.builder.io/) - [Source](src/features/builderIO/)
* [React.js](https://reactjs.org/) - [Source](src/features/reactJS/)
* CSS and SCSS support - [Source](src/features/css/)
* [TypeScript](https://www.typescriptlang.org/)
* [OpenAI](https://platform.openai.com) - [Source](src/features/AI/)
* [Ollama](https://ollama.ai) - [Source](src/features/AI/)

### NPM Scripts

You can call any script you want before or after component creation! For NPM Scripts, please check the [npm scripts](docs/npm-scripts.md) page.

### CLI Arguments

For CLI Arguments, please check the [CLI arguments](docs/cli-arguments.md) page.

### How to create custom plugin

For creating custom plugin, please check the [custom plugin](docs/how-to-create-custom-plugin.md) page. You can create your own libraries' plugin easily with extensive functionality and [Handlebars](https://handlebarsjs.com/) template engine.

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

### Contributing

If you'd like to contribute to Hayde, please check the [contributing](docs/contributing.md) page. Contributions are always welcome!

If you want to integrate your library/plugin/boilerplate to Hayde, please check the [how to create custom plugin](docs/how-to-create-custom-plugin.md) page.

### License

Distributed under the GPL-3.0 License. See [LICENSE](LICENSE/) for more information.
