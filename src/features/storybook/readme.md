## Storybook module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `storybook` to the plugins array.

```json
{
  "plugins": [
    "general",
    "storybook",
    "reactJS",
    "materialUI",
    "chakraUI"
  ]
}
```

### Options

| Option         | Description | Default   | Type   |
| -------------- | ----------- | --------- | ------ |
| templateName   | -           | cssModule | string |
| templateFolder | -           | css       | string |
