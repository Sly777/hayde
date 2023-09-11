import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";

export interface IPluginOptions {
  isFolderAvailable?: boolean;
  pluginName?: string;
}

export interface ISettings extends IPluginOptions {
  templatesPath: string;
  srcFolderLocation: string;
  templateMainName: string;
  templateInterfaceName: string;
  templateQuestionsName: string;
  templateReadmeName: string;
}

export const defaultSettings: ISettings = {
  templatesPath: "/templates/createPlugin",
  srcFolderLocation: "./src/features",
  templateMainName: "main",
  templateInterfaceName: "interfaces",
  templateQuestionsName: "questions",
  templateReadmeName: "readme",
};

export type OutAnswers = {
  createPlugin: PluginInitReturn<ISettings>;
};
