import { Question } from "inquirer";

export const templates = ["component", "interface", "cssModule", "builderIo"];

export interface PluginImport<T = object> {
  name: string;
  options: T;
}

export type PluginRunReturn = void;

export interface PluginInitParams<T = object, K = object> {
  globalOptions?: CreatorSettings;
  options?: T;
  answersUntilNow?: K;
}

export interface PluginInitReturnAnswers<T = object> {
  answersUntilNow?: PluginAnswers<T>;
}

interface EmptyObjectWithOldAnswers {
  answersUntilNow?: PluginAnswers;
}

export interface PluginInitReturn<T = EmptyObjectWithOldAnswers> {
  answers: T;
}

export interface PluginRunParams<T = object, K = object> {
  globalSettings: CreatorSettings;
  pluginSettings: T;
  allAnswers: K;
}

export interface PluginExport {
  pluginName: string;
  questions: Question[];
  initPlugin: (params: PluginInitParams) => Promise<PluginInitReturn>;
  runPlugin: (params: PluginRunParams) => Promise<PluginRunReturn>;
  pluginSettings?: object;
  answers: object;
  defaultSettings?: object;
  checkTemplate?: (template: string, settings: CreatorSettings) => void;
}

export interface PluginAnswers<T = object> {
  [key: string]: PluginInitReturn<T>;
}

export interface PluginList {
  [key: string]: string | PluginExport;
}

export interface CreatorSettings {
  plugins: (string | PluginImport)[];
}

export type CreatorAnswers = PluginAnswers;

export const __DEFAULT__ = "__DEFAULT__";
