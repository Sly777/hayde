/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
} from "../../creatorSettings/creatorSettings.type";
import { AITools, IPluginOptions, ISettings, OutAnswers } from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { logger, publicLog } from "@/helper";
import { createFile } from "@/internalFeatures/fsLibrary";
import ora from "ora";
import { callAgent as openAICallAgent } from "./models/openAI/openai";
import { callAgent as ollamaCallAgent } from "./models/ollama/ollama";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "AI";
const log = logger(pluginName);

export async function initPlugin({
  options,
}: PluginInitParams<IPluginOptions, OutAnswers>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  publicLog("Before starting, please make sure that you added required ENV variables to your .env file.");
  const answers = (await inquirer.prompt(
    questions,
    options
  )) as Required<ISettings>;

  return {
    answers,
  };
}

export async function runPlugin({
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn> {
  const aiAnswers = allAnswers.AI?.answers as Required<ISettings>;
  const generalAnswers = allAnswers.general?.answers;

  log("Answers:", aiAnswers);

  console.log("\n");
  const spinner = ora({
    text: "Waiting for AI answer",
    spinner: "point",
  }).start();

  const reqData = {
    componentName: generalAnswers.componentName!,
    componentDescription: aiAnswers.compDescription,
    styleLibrary: aiAnswers.styleLibrary,
    modelName: aiAnswers.modelName,
    isTypescript: aiAnswers.isTS,
  };
  const aiTool = aiAnswers.aiTool;
  let response;

  if (aiTool === AITools.openAI) {
    response = await openAICallAgent(reqData);
  } else if (aiTool === AITools.ollama) {
    response = await ollamaCallAgent(reqData);
  }

  log("AI response:", response);

  spinner.succeed("AI answer received");
  createFile(allAnswers, aiAnswers.isTS ? ".tsx" : ".jsx", response as string);
}
