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

### Tags

If you want Hayde to import your components into `builderRegistry` file automatically when you create the component, you need to add comment tags into your builderRegistry.

```tsx
import { Builder } from "@builder.io/react";

// <!-- #hayde-builderIOImports -->
import Button from "./components/Button/Button";
import { builderIoSettings as ButtonSettings } from "./components/Button/Button.builderIo";
// <!-- #hayde-end-builderIOImports -->

// <!-- #hayde-builderIORegisterComponents -->
Builder.registerComponent(Button, buttonSettings);
// <!-- #hayde-end-builderIORegisterComponents -->
```

and then add `importOnBuilderRegistryTag` and `registerOnBuilderRegistryTag` tags to your `.hayde.json` file.

```json
{
  "builderIO": {
    "importOnBuilderRegistryTag": "builderIOImports",
    "registerOnBuilderRegistryTag": "builderIORegisterComponents"
  }
}
```


### Options

| Option                       | Description | Default                       | Type    |
| ---------------------------- | ----------- | ----------------------------- | ------- |
| name                         | -           | `Component Name`              | string  |
| override                     | -           | `true`                        | boolean |
| addChildren                  | -           | `true`                        | boolean |
| fileSuffix                   | -           | `.builderIo`                  | string  |
| templateName                 | -           | `main`                        | string  |
| templateFolder               | -           | `builderIO`                   | string  |
| builderRegistryPath          | -           | `./src/builderRegistry.ts`    | string  |
| importOnBuilderRegistryTag   | -           | `builderIOImports`            | string  |
| registerOnBuilderRegistryTag | -           | `builderIORegisterComponents` | string  |

