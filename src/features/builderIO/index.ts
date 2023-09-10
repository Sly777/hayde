/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
  __DEFAULT__,
} from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions, ISettings, OutAnswers } from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { compileTemplate } from "@/internalFeatures/templatesLibrary";
import { createFile } from "@/internalFeatures/fsLibrary";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "builderIO";

export async function initPlugin({
  options,
  globalOptions,
  answersUntilNow,
}: PluginInitParams<IPluginOptions, OutAnswers>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  if (options?.name === __DEFAULT__) {
    options.name = answersUntilNow?.general?.answers.componentName;
  }

  const answers = (await inquirer.prompt(questions, {
    ...options,
    answersUntilNow,
  })) as Required<IPluginOptions>;

  answers.enabled = true;

  return {
    answers,
  };
}

export async function runPlugin({
  pluginSettings,
  globalSettings,
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn> {
  const answers = allAnswers.builderIO?.answers as Required<ISettings>;
  const builderIoContent = await compileTemplate(
    answers.templateName,
    answers.templateFolder,
    globalSettings,
    allAnswers,
  );

  createFile(allAnswers, `${answers.fileSuffix}.ts`, builderIoContent);
}
