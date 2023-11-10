## CSS module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `css` to the plugins array.

```json
{
  "plugins": [
    "general",
    "css",
    "reactJS",
    "materialUI",
    "chakraUI"
  ]
}
```

### Options

| Option           | Description | Default   | Type    |
|------------------|-------------|-----------|---------|
| cssModuleSupport | -           | true      | boolean |
| sassSupport      | -           | false     | boolean |
| fileExtension    | -           | css       | string  |
| fileSuffix       | -           | .module   | string  |
| templateName     | -           | cssModule | string  |
| templateFolder   | -           | css       | string  |
