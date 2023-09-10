import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";

export const qSupportCSSModule: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.cssModuleSupport == undefined,
  type: "confirm",
  name: "cssModuleSupport",
  message: "Does the project support CSS Module?",
  default: true,
};

export const qSupportSCSS: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.sassSupport == undefined,
  type: "confirm",
  name: "sassSupport",
  message: "Does the project support SASS/SCSS?",
  default: false,
};

export const questions: Question[] = [qSupportCSSModule, qSupportSCSS];
