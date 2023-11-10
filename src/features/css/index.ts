/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
} from "../../creatorSettings/creatorSettings.type";
import {
  IPluginOptions,
  ISettings,
  OutAnswers,
  fileExtension,
  fileSuffix,
} from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { compileTemplate } from "@/internalFeatures/templatesLibrary/templatesLibrary";
import { createFile } from "@/internalFeatures/fsLibrary/fsLibrary";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "css";

export async function initPlugin({
  options,
  globalOptions,
}: PluginInitParams<IPluginOptions>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  const answers = (await inquirer.prompt(
    questions,
    options
  )) as Required<ISettings>;

  if (answers.sassSupport) {
    answers.fileExtension = fileExtension.scss;
  }

  answers.fileSuffix = answers.cssModuleSupport
    ? fileSuffix.module
    : fileSuffix.empty;

  return {
    answers,
  };
}

export async function runPlugin({
  pluginSettings,
  globalSettings,
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn> {
  const answers = allAnswers.css?.answers as Required<ISettings>;
  const cssContent = await compileTemplate(
    answers.templateName,
    answers.templateFolder,
    globalSettings,
    allAnswers
  );

  createFile(
    allAnswers,
    `${answers.fileSuffix}.${answers.fileExtension}`,
    cssContent
  );
}
