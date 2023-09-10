## Builder.IO module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `builderIO` to the plugins array.

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

| Option         | Description | Default        | Type    |
|----------------|-------------|----------------|---------|
| name           | -           | Component Name | string  |
| override       | -           | true           | boolean |
| addChildren    | -           | true           | boolean |
| fileSuffix     | -           | .builderIo     | string  |
| templateName   | -           | main           | string  |
| templateFolder | -           | builderIO      | string  |

