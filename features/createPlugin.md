## Create Plugin module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `createPlugin` **only** to the plugins array.

```json
{
  "plugins": [
    "createPlugin"
  ]
}
```

### Options

| Option                | Description | Default            | Type   |
| --------------------- | ----------- | ------------------ | ------ |
| srcFolderLocation     | -           | `./src/components` | string |
| pluginName            | -           | -                  | string |
| templatesPath         | -           | `/templates`       | string |
| templateMainName      | -           | `main`             | string |
| templateInterfaceName | -           | `interfaces`       | string |
| templateQuestionsName | -           | `questions`        | string |
| templateReadmeName    | -           | `readme`           | string |
