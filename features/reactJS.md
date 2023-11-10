## React.js module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `reactJS` to the plugins array.

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

| Option                       | Description | Default          | Type                               |
|------------------------------|-------------|------------------|------------------------------------|
| createProps                  | -           | true             | boolean                            |
| createInterface              | -           | true             | boolean                            |
| styleLibrary                 | -           | -                | `chakraUI` | `materialUI` | `none` |
| propList                     | -           | []               | string[]                           |
| interfaceTemplateName        | -           | interface        | string                             |
| interfaceFileSuffix          | -           | .interface       | string                             |
| componentTemplateName        | -           | component        | string                             |
| componentContentTemplateName | -           | componentContent | string                             |
| importsTemplateName          | -           | imports          | string                             |
| exportsTemplateName          | -           | exports          | string                             |
| propsTemplateName            | -           | props            | string                             |
| templateFolder               | -           | reactJS          | string                             |
