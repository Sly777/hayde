import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions as ReactOptions } from "@/features/reactJS/interfaces";

export interface IPluginOptions {
  cssModuleSupport?: boolean;
  sassSupport?: boolean;
  fileExtension?: string;
}

export type OutAnswers = {
  reactJS: PluginInitReturn<ReactOptions>;
  css: PluginInitReturn<IPluginOptions>;
};

export enum fileSuffix {
  module = ".module",
  empty = "",
}

export enum fileExtension {
  css = "css",
  scss = "scss",
}

export interface ISettings extends IPluginOptions {
  fileSuffix: fileSuffix;
  templateName: string;
  templateFolder: string;
}

export const defaultSettings: ISettings = {
  fileSuffix: fileSuffix.module,
  templateName: "cssModule",
  templateFolder: "css",
  fileExtension: fileExtension.css,
};
