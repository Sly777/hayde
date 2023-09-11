import cfonts from "cfonts";
import defaultSettings from "@/creatorSettings/creatorSettings";
import {
  CreatorSettings,
  PluginAnswers,
  PluginExport,
  templates,
} from "@/creatorSettings/creatorSettings.type";
import {
  addAdditionalHelpers,
  checkTemplate,
} from "@/internalFeatures/templatesLibrary";
import {
  getCreatorSettings,
  replaceDefaultsWithDefaultValues,
} from "@/internalFeatures/dataLibrary";
import {
  ScriptNames,
  runScriptFromPackagejson,
} from "@/internalFeatures/runScriptFromPackage";
import { errorLog, log } from "./helper";
import { getArgvOptions } from "./internalFeatures/argvLibrary";

/**
 * A class representing a CLI tool for creating components with various options.
 */
export class CliTool {
  private jsonSettings: CreatorSettings = { plugins: [] };
  private settings: CreatorSettings = defaultSettings;
  private createdBy: string = "Created by github/sly777";
  private answers: PluginAnswers = {};

  constructor() {
    console.clear();
    addAdditionalHelpers();
    cfonts.say("Hayde!", { font: "tiny", colors: ["#EBC16F"] });
  }

  private checkBeforeStart() {
    for (const template of templates) {
      checkTemplate(template, this.settings);
    }
  }

  private async processAllAnswers() {
    runScriptFromPackagejson(ScriptNames.preComponentCreate);

    const plugins = this.settings.plugins;
    if (plugins) {
      for (const plugin of plugins) {
        const pluginName = typeof plugin === "string" ? plugin : plugin.name;

        const { runPlugin } =
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require(`./features/${pluginName}/index.ts`) as PluginExport;

        if (!runPlugin) {
          errorLog(`Plugin "${pluginName}" does not have a runPlugin()`);
          continue;
        }

        const pluginSettings = typeof plugin === "string" ? {} : plugin.options;

        await runPlugin({
          pluginSettings,
          globalSettings: this.settings,
          allAnswers: this.answers,
        });
      }
    }
  }

  private finish() {
    runScriptFromPackagejson(ScriptNames.postComponentCreate);
    console.log("\n\nComponent created successfully.");
  }

  private async askQuestions() {
    const plugins = this.settings.plugins;
    if (plugins) {
      for (const plugin of plugins) {
        const pluginName = typeof plugin === "string" ? plugin : plugin.name;

        const { initPlugin } =
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require(`./features/${pluginName}/index.ts`) as PluginExport;

        const pluginOptions = typeof plugin === "string" ? {} : plugin.options;

        if (!initPlugin) {
          errorLog(`Plugin "${pluginName}" does not have an initPlugin()`);
          continue;
        }

        const pluginReturn = await initPlugin({
          options: pluginOptions,
          globalOptions: this.settings,
          answersUntilNow: this.answers,
        });

        if (pluginReturn.answers?.answersUntilNow) {
          delete pluginReturn.answers?.answersUntilNow;
        }

        this.answers = {
          ...this.answers,
          [pluginName]: { ...pluginReturn },
        };
      }
    }
  }

  public async run() {
    console.log(`\n${this.createdBy}\n\n`);

    const ArgvOptions = getArgvOptions();
    log("CLI script options:", ArgvOptions);

    this.getSettingsFromJson();
    this.checkBeforeStart();
    await this.askQuestions();
    await this.processAllAnswers();

    this.finish();
  }

  private getSettingsFromJson() {
    this.jsonSettings = getCreatorSettings();

    if (!this.jsonSettings.plugins || this.jsonSettings.plugins.length === 0) {
      throw new Error(
        "No plugins found in .hayde.json file or default settings."
      );
    }

    for (const plugin of this.jsonSettings.plugins) {
      const pluginName = typeof plugin === "string" ? plugin : plugin.name;

      let { defaultSettings } =
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(`./features/${pluginName}/index.ts`) as PluginExport;

      this.jsonSettings.plugins = this.jsonSettings.plugins?.map((plugin) => {
        if (typeof plugin === "string") {
          if (!defaultSettings) {
            throw new Error(
              `Plugin "${pluginName}" does not have default settings`
            );
          }

          return {
            name: plugin,
            options: {
              ...defaultSettings,
            },
          };
        } else {
          if (!defaultSettings) {
            defaultSettings = {};
          }

          if (plugin.name !== pluginName) {
            return plugin;
          }

          plugin.options = replaceDefaultsWithDefaultValues(
            plugin.options,
            defaultSettings
          );

          return {
            ...plugin,
            options: {
              ...defaultSettings,
              ...plugin.options,
            },
          };
        }
      });
    }

    this.settings = {
      ...this.settings,
      ...this.jsonSettings,
    };
  }
}
