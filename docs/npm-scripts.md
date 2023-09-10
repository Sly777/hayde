## NPM Feature

If you want to run any script after or before the component creation, you can use our custom commands.

- `post-component-creation`: This command will be executed after the component creation.
- `pre-component-creation`: This command will be executed before the component creation.

To use this feature, you need to add the following code to your `package.json` file.

```json
{
  "scripts": {
    "post-component-creation": "echo 'Component Created'",
    "pre-component-creation": "echo 'Component Creation Started'"
  }
}
```
