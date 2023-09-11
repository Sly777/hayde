import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";

export interface IPluginOptions {
  storybookSupport?: boolean;
}

export interface ISettings extends IPluginOptions {
  templateName: string;
  templateFolder: string;
}

export type OutAnswers = {
  storybook: PluginInitReturn<ISettings>;
};

export const defaultSettings: ISettings = {
  templateName: "main",
  templateFolder: "storybook",
};
