import { Answers } from "inquirer";
import { PluginInitReturn } from "@/creatorSettings/creatorSettings.type";
import { ISettings as MaterialUIOptions } from "@/features/materialUI/interfaces";
import { ISettings as ChakraUIOptions } from "@/features/chakraUI/interfaces";
import { IReturns as EmmetReturns } from "@/features/emmet/interfaces";

export interface ReactPropAnswers extends Answers {
  propName?: string;
  propCreationAskAgain?: boolean;
}

export interface ReactComponentAnswers extends Answers {
  createProps?: boolean;
  createInterface?: boolean;
  styleLibrary?: StyleLibrary;
  propList?: string[];
  hasNoStyleLibrary?: boolean;
}

export enum StyleLibrary {
  ChakraUI = "chakraUI",
  MaterialUI = "materialUI",
  None = "none",
}

export type IPluginOptions = ReactComponentAnswers;

export interface ISettings extends IPluginOptions {
  interfaceTemplateName: string;
  interfaceFileSuffix: string;
  componentTemplateName: string;
  componentContentTemplateName: string;
  importsTemplateName: string;
  exportsTemplateName: string;
  propsTemplateName: string;
  templateFolder: string;
}

export type OutAnswers = {
  reactJS: PluginInitReturn<ISettings>;
  materialUI: PluginInitReturn<MaterialUIOptions>;
  chakraUI: PluginInitReturn<ChakraUIOptions>;
};

export type OutReturns = {
  emmet?: EmmetReturns;
};

export const defaultSettings: ISettings = {
  interfaceTemplateName: "interface",
  interfaceFileSuffix: ".interface",
  componentTemplateName: "component",
  componentContentTemplateName: "componentContent",
  importsTemplateName: "imports",
  exportsTemplateName: "exports",
  propsTemplateName: "props",
  templateFolder: "reactJS",
};
