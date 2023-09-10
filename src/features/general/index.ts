/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
} from "../../creatorSettings/creatorSettings.type";
import { IPluginOptions } from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { titleCase } from "@/helper";
import { checkFolder } from "@/internalFeatures/fsLibrary";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "general";

export async function initPlugin({
  options,
  globalOptions,
}: PluginInitParams<IPluginOptions>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  const answers = (await inquirer.prompt(
    questions,
    options,
  )) as Required<IPluginOptions>;

  answers.isFolderAvailable = checkFolder(answers.srcFolderLocation);

  if (!answers.isFolderAvailable) {
    throw new Error("Folder location is not available.");
  }

  answers.componentName = titleCase(answers.componentName);

  return {
    answers,
  };
}
