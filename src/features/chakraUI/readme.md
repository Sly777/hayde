## Chakra UI module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `chakraUI` to the plugins array.

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

| Option                       | Description | Default          | Type   |
|------------------------------|-------------|------------------|--------|
| componentName                | -           | -                | string |
| componentContentTemplateName | -           | componentContent | string |
| templateFolder               | -           | chakraUI         | string |
