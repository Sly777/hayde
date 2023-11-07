import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";
import { StyleLibrary } from "@/features/reactJS/interfaces";
import { IPluginOptions as GeneralOptions } from "@/features/general/interfaces";

export interface IPluginOptions {
  modelName?: string;
  compDescription?: string;
  styleLibrary?: StyleLibrary;
  isTS?: boolean;
  aiTool?: AITools;
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
