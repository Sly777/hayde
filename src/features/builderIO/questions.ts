import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";

export const qBuilderIoName: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.name == undefined,
  type: "input",
  name: "name",
  message: "What is the name of the builder.io component?",
  default: (answers: IPluginOptions) => {
    const reactAnswers = answers.answersUntilNow?.general?.answers;
    return reactAnswers?.componentName as string;
  },
};

export const qBuilderIoOverride: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.override == undefined,
  type: "confirm",
  name: "override",
  message: "Do you want to override native component?",
  default: true,
};

export const qBuilderIoChildren: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.addChildren == undefined,
  type: "confirm",
  name: "addChildren",
  message: "Can this have children components?",
  default: true,
};

export const qBuilderIoBuilderRegistry: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.builderRegistryPath == undefined,
  type: "input",
  name: "builderRegistryPath",
  message: "Please enter the builder registry file path (optional)",
  default: "./src/builderRegistry.ts",
};

export const qBuilderRegistryComponentsPath: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.builderRegistryComponentsPath == undefined &&
    answers.builderRegistryPath != undefined,
  type: "input",
  name: "builderRegistryComponentsPath",
  message: "Please enter components folder path that builderIO will use",
  default: "./components",
};

export const questions: Question[] = [
  qBuilderIoName,
  qBuilderIoOverride,
  qBuilderIoChildren,
  qBuilderIoBuilderRegistry,
  qBuilderRegistryComponentsPath,
];
