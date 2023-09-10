## How to Create Custom Plugin

# WIP

Plugins are the way to extend the functionality of the framework. You can create your own plugins and use them in your projects. 

## Plugin Structure

A plugin is a folder with the following structure:

```
plugin-name
├── index.js
├── package.json
```

### index.js

This file is the entry point of the plugin. It should export;
- `pluginName`: Name of the plugin
- `initPlugin`: Init function of the plugin
- `runPlugin`: Run function of the plugin after everything is ready to go for parsing the component
