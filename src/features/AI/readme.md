## AI module

### Usage

Please create a new json file called `.hayde.json` in your project root. This file will be used to configure the Hayde.

And then add `AI` to the plugins array.

```json
{
  "plugins": [
    "general",
    "AI",
  ]
}
```

For now, you can just use `general` and `AI` plugins together. There is no need to use other plugins.

### Information

Currently it only supports [OpenAI](https://platform.openai.com/docs/overview) and [Ollama](https://ollama.ai/) as AI tools. But we are planning to add more AI tools in the future.

On OpenAI, it works properly with all gpt engines. On Ollama, we tested hayde with llama2 engines.

### Requirements

If you want to use OpenAI, you need to set `OPENAI_API_KEY` environment variable. You can get your api key from [here](https://platform.openai.com/account/api-keys).

If you want to use Ollama, you need to set `OLLAMA_URL` environment variable. For example; `http://localhost:11434` Don't forget to run Ollama server.

### Options

| Option          | Description                              | Default  | Type    |
| --------------- | ---------------------------------------- | -------- | ------- |
| aiTool          | AI Tool Name                             | "openAI" | string  |
| compDescription | Component Description                    | -        | string  |
| styleLibrary    | "chakraUI", "materialUI", "none"         | -        | string  |
| isTS            | Do you want to get typescript component? | true     | boolean |
| modelName       | Model name depends on AI Tool            | -        | string  |
