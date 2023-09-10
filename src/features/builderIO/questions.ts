import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";

export const qBuilderIoName: Question<Answers> = {
  type: "input",
  name: "name",
  message: "What is the name of the builder.io component?",
  default: (answers: IPluginOptions) => {
    const reactAnswers = answers.answersUntilNow?.general?.answers;
    return reactAnswers?.componentName as string;
  },
};

export const qBuilderIoOverride: Question<Answers> = {
  type: "confirm",
  name: "override",
  message: "Do you want to override native component?",
  default: true,
};

export const qBuilderIoChildren: Question<Answers> = {
  type: "confirm",
  name: "addChildren",
  message: "Can this have children components?",
  default: true,
};

export const questions: Question[] = [
  qBuilderIoName,
  qBuilderIoOverride,
  qBuilderIoChildren,
];
