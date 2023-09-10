import { PluginAnswers } from "../../creatorSettings/creatorSettings.type";
import { ISettings as ReactOptions } from "@/features/reactJS/interfaces";

export interface IPluginOptions {
  answersUntilNow?: OutAnswers;
  componentName?: string;
  enabled?: boolean;
}

export interface ISettings extends IPluginOptions {
  componentContentTemplateName: string;
  templateFolder: string;
}

export type OutAnswers = PluginAnswers<ReactOptions>;

export const defaultSettings: ISettings = {
  componentContentTemplateName: "componentContent",
  templateFolder: "chakraUI",
};
