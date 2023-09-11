## Emmet module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `emmet` to the plugins array.

```json
{
  "plugins": [
    "general",
    "css",
    "emmet",
    "reactJS",
    "chakraUI"
  ]
}
```

### Options

| Option              | Description                                 | Default              | Type     |
| ------------------- | ------------------------------------------- | -------------------- | -------- |
| code                | Emmet code                                  | -                    | string   |
| componentContentTag | Placeholder for component on emmet code     | {{componentContent}} |          |
| area                | Position of the component on the emmet code | -                    | `inside` | `outside` |

## Returns

| Return      | Description                                 | Type     |
| ----------- | ------------------------------------------- | -------- |
| area        | Position of the component on the emmet code | string   |
| classNames  | CSS classname list from emmet code          | string[] |
| ids         | CSS ID list from emmet code                 | string[] |
| htmlContent | HTML result of emmet                        | string   |
