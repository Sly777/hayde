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
} from "@/internalFeatures/templatesLibrary/templatesLibrary";
import {
  getCreatorSettings,
  replaceDefaultsWithDefaultValues,
} from "@/internalFeatures/dataLibrary/dataLibrary";
import {
  ScriptNames,
  runScriptFromPackagejson,
} from "@/internalFeatures/runScriptFromPackage/runScriptFromPackage";
import { logger, publicLog } from "./helper";
import { getArgvOptions } from "./internalFeatures/argvLibrary/argvLibrary";
import {
  defaultSettingsFile,
  initFSLibrary,
} from "./internalFeatures/fsLibrary/fsLibrary";

const log = logger("CLI Tool", true);

/**
 * A class representing a CLI tool for creating components with various options.
 */
export class CliTool {
  private jsonSettings: CreatorSettings = { plugins: [] };
  private settings: CreatorSettings = defaultSettings;
  private createdBy: string = "Created by github/sly777";
  private answers: PluginAnswers = {};
  private returnsFromPlugins = {};

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
          log(`Plugin "${pluginName}" does not have a runPlugin()`);
          continue;
        }

        const pluginSettings = typeof plugin === "string" ? {} : plugin.options;

        const result = await runPlugin({
          pluginSettings,
          globalSettings: this.settings,
          allAnswers: this.answers,
          allReturns: this.returnsFromPlugins,
        });

        if (!result) {
          continue;
        }

        if (result.returns) {
          this.returnsFromPlugins = {
            ...this.returnsFromPlugins,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [pluginName]: result.returns,
          };
        }
      }
    }
  }

  private finish() {
    runScriptFromPackagejson(ScriptNames.postComponentCreate);
    publicLog("Component created successfully.");
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
          log(`Plugin "${pluginName}" does not have an initPlugin()`);
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
    publicLog(`${this.createdBy}\n\n`);

    const ArgvOptions = getArgvOptions();
    log("CLI script options:", ArgvOptions);
    initFSLibrary();

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
        `No plugins found in ${defaultSettingsFile()} file or default settings.`
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
