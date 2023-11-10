## General module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `general` to the plugins array. **This plugin is required for the Hayde to work properly.**

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

| Option                                | Description | Default                     | Type   |
| ------------------------------------- | ----------- | --------------------------- | ------ |
| srcFolderLocation                     | -           | `./src/components`          | string |
| componentName                         | -           | -                           | string |
| templatesPath                         | -           | `/templates`                | string |
| importOnBuilderRegistryTemplateName   | -           | `importOnBuilderRegistry`   | string |
| registerOnBuilderRegistryTemplateName | -           | `registerOnBuilderRegistry` | string |
