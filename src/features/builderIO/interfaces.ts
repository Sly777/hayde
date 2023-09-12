import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions as ReactOptions } from "@/features/reactJS/interfaces";
import { IPluginOptions as GeneralOptions } from "@/features/general/interfaces";

export interface IPluginOptions {
  answersUntilNow?: OutAnswers;
  name?: string;
  override?: boolean;
  addChildren?: boolean;
  enabled?: boolean;
  builderRegistryPath?: string;
  builderRegistryComponentsPath?: string;
}

export type OutAnswers = {
  reactJS: PluginInitReturn<ReactOptions>;
  builderIO: PluginInitReturn<IPluginOptions>;
  general: PluginInitReturn<Required<GeneralOptions>>;
};

export interface ISettings extends IPluginOptions {
  fileSuffix: string;
  templateName: string;
  templateFolder: string;
  importOnBuilderRegistryTemplateName: string;
  registerOnBuilderRegistryTemplateName: string;
  importOnBuilderRegistryTag: string;
  registerOnBuilderRegistryTag: string;
}

export const defaultSettings: ISettings = {
  fileSuffix: ".builderIo",
  templateName: "main",
  templateFolder: "builderIO",
  enabled: false,
  importOnBuilderRegistryTemplateName: "importOnBuilderRegistry",
  registerOnBuilderRegistryTemplateName: "registerOnBuilderRegistry",
  importOnBuilderRegistryTag: "builderIOImports",
  registerOnBuilderRegistryTag: "builderIORegisterComponents",
};
