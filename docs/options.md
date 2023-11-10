# Hayde | Options

## Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

## Profiles

If you want to have multiple `.hayde` file, you can just create the file with your profile. For example; you can create two files called `.hayde.json` and `.hayde.ai.json`. And then you can run the following command to use the `.hayde.ai.json` file.

```bash
npx hayde --profile ai
```

## Example

Please check the example below to see how to configure the Hayde or you can check the [example file](../.hayde.json) in this repository. You can also find examples in the [examples](../examples) folder.

```json
{
  "plugins": [
    "general",
    {
      "name": "css",
      "options": {
        "cssModuleSupport": true,
        "sassSupport": false
      }
    },
    "reactJS",
    "materialUI",
    "chakraUI"
  ]
}

```

## Options

Please check [Features Folder](../src/features/) for more information about the options.
