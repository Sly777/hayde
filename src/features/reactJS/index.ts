/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
} from "@/creatorSettings/creatorSettings.type";
import {
  askReactPropsQuestions,
  createInterfaceFile,
  createReactComponentFile,
} from "./helper";
import {
  IPluginOptions,
  ISettings,
  OutAnswers,
  StyleLibrary,
} from "./interfaces";
import inquirer from "inquirer";
import { reactComponentQuestions } from "./questions";

export {
  questions,
  reactComponentQuestions,
  reactPropQuestions,
} from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "reactJS";

export async function initPlugin({
  options,
  globalOptions,
}: PluginInitParams<IPluginOptions>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  const answers = (await inquirer.prompt(
    reactComponentQuestions,
    options
  )) as Required<IPluginOptions>;

  if (answers.createProps) {
    answers.propList = await askReactPropsQuestions(answers);
  }

  answers.hasNoStyleLibrary = answers.styleLibrary === StyleLibrary.None;

  return {
    answers,
  };
}

export async function runPlugin({
  pluginSettings,
  globalSettings,
  allAnswers,
  allReturns,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn> {
  await createInterfaceFile({
    pluginSettings,
    globalSettings,
    allAnswers,
    allReturns,
  });
  await createReactComponentFile({
    pluginSettings,
    globalSettings,
    allAnswers,
    allReturns,
  });
}
