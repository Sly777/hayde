import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions as ReactOptions } from "@/features/reactJS/interfaces";
import { IPluginOptions as GeneralOptions } from "@/features/general/interfaces";

export interface IPluginOptions {
  answersUntilNow?: OutAnswers;
  name?: string;
  override?: boolean;
  addChildren?: boolean;
  enabled?: boolean;
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
}

export const defaultSettings: ISettings = {
  fileSuffix: ".builderIo",
  templateName: "main",
  templateFolder: "builderIO",
  enabled: false,
};
