/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
} from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions, ISettings, OutAnswers } from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { createFile } from "@/internalFeatures/fsLibrary/fsLibrary";
import { compileTemplate } from "@/internalFeatures/templatesLibrary/templatesLibrary";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "createPlugin";

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

  answers.isFolderAvailable = true;

  if (!answers.isFolderAvailable) {
    throw new Error("Folder location is not available.");
  }

  return {
    answers,
  };
}

export async function runPlugin({
  pluginSettings,
  globalSettings,
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn> {
  const answers = allAnswers.createPlugin?.answers as Required<ISettings>;
  const mainContent = await compileTemplate(
    answers.templateMainName,
    answers.templatesPath,
    globalSettings,
    allAnswers
  );
  createFile(allAnswers, `index.ts`, mainContent, {
    fullName: true,
    isPluginCreator: true,
  });

  const interfaceContent = await compileTemplate(
    answers.templateInterfaceName,
    answers.templatesPath,
    globalSettings,
    allAnswers
  );
  createFile(allAnswers, `interfaces.ts`, interfaceContent, {
    fullName: true,
    isPluginCreator: true,
  });

  const questionsContent = await compileTemplate(
    answers.templateQuestionsName,
    answers.templatesPath,
    globalSettings,
    allAnswers
  );
  createFile(allAnswers, `questions.ts`, questionsContent, {
    fullName: true,
    isPluginCreator: true,
  });

  const readmeContent = await compileTemplate(
    answers.templateReadmeName,
    answers.templatesPath,
    globalSettings,
    allAnswers
  );
  createFile(allAnswers, `readme.md`, readmeContent, {
    fullName: true,
    isPluginCreator: true,
    noFormat: true,
  });
}
