import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";

export interface IPluginOptions {
  code?: string;
  area?: EmmetArea;
  componentContentTag?: string;
}

export enum EmmetArea {
  inside = "inside",
  outside = "outside",
}

export interface ISettings extends IPluginOptions {}

export type OutAnswers = {
  emmet: PluginInitReturn<ISettings>;
};

export const defaultSettings: ISettings = {
  componentContentTag: `{{componentContent}}`,
};

export interface IReturns {
  area: EmmetArea;
  classNames: string[];
  ids: string[];
  htmlContent: string;
}
