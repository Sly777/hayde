import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";

export const qComponentName: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.componentName == undefined,
  type: "input",
  name: "componentName",
  message: "What is the name of the component?",
};

export const qFolderLocation: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.srcFolderLocation == undefined,
  type: "input",
  name: "srcFolderLocation",
  message: "What is the location of the src folder?",
  default: "./src/components",
};

export const questions: Question[] = [qComponentName, qFolderLocation];
