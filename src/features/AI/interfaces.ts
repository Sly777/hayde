import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";
import { StyleLibrary } from "@/features/reactJS/interfaces";
import { IPluginOptions as GeneralOptions } from "@/features/general/interfaces";
import { IOpenAIOptions } from "./models/openAI/openai.types";
import { MergeDeep } from "type-fest";

type ModelsOptions = MergeDeep<
  IOpenAIOptions,
  IOpenAIOptions,
  { arrayMergeMode: "spread" }
>;

export interface IPluginOptions extends ModelsOptions {
  compDescription?: string;
  styleLibrary?: StyleLibrary;
  isTS?: boolean;
  aiTool?: AITools;
  aiCreateStorybook?: boolean;
  aiCreateTest?: boolean;
}

export interface ISettings extends IPluginOptions {
  templateName: string;
  templateFolder: string;
}

export type OutAnswers = {
  AI: PluginInitReturn<ISettings>;
  general: PluginInitReturn<GeneralOptions>;
};

export const defaultSettings: ISettings = {
  templateName: "main",
  templateFolder: "AI",
};

export enum AITools {
  openAI = "openAI",
  ollama = "ollama",
}

export interface IModelReturn {
  callAgent: callAgentFn;
}

export type callAgentFn = (options: callAgentFnOptions) => Promise<string>;

export type callAgentFnOptions = {
  componentName: string;
  componentDescription: string;
  styleLibrary: string;
  modelName: string;
  isTypescript: boolean;
};

export type callAgentWithCodeFnOptions = {
  componentName: string;
  componentDescription: string;
  styleLibrary: string;
  modelName: string;
  isTypescript: boolean;
  componentCode: string;
};
