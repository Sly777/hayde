/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
} from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions, OutAnswers } from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { StyleLibrary } from "@/features/reactJS/interfaces";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "chakraUI";

export async function initPlugin({
  options,
  globalOptions,
  answersUntilNow,
}: PluginInitParams<IPluginOptions, OutAnswers>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  const answers = (await inquirer.prompt(questions, {
    ...options,
    answersUntilNow,
  })) as Required<IPluginOptions>;

  // we need this for handlebars template
  answers.enabled =
    answers.answersUntilNow?.reactJS?.answers.styleLibrary ===
    StyleLibrary.ChakraUI;

  return {
    answers,
  };
}
