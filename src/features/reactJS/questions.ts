import { Answers, ListQuestion, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";
import Separator from "inquirer/lib/objects/separator";

export const qCreateProps: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.createProps == undefined,
  type: "confirm",
  name: "createProps",
  message: "Do you want to create props?",
  default: true,
};

export const qPropCreationName: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.createProps === true && answers.propList == undefined,
  type: "input",
  name: "propName",
  message: "What is the name of the prop?",
};

export const qPropCreationAskAgain: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.createProps === true && answers.propList == undefined,
  type: "confirm",
  name: "propCreationAskAgain",
  message: "Do you want to add another prop? (just hit enter for YES)",
  default: true,
};

export const qCreateInterface: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.createInterface == undefined,
  type: "confirm",
  name: "createInterface",
  message: "Do you want to create interface?",
  default: true,
};

export const qChooseStyleLibrary: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) => answers.styleLibrary == undefined,
  type: "list",
  name: "styleLibrary",
  message: "Which style library do you want to use?",
  choices: ["Chakra UI", "Material UI", new Separator(), "None"],
  filter(val: string) {
    return val.toLowerCase();
  },
};

export const reactComponentQuestions: (Question | ListQuestion)[] = [
  qChooseStyleLibrary,
  qCreateInterface,
  qCreateProps,
];

export const reactPropQuestions: Question[] = [
  qPropCreationName,
  qPropCreationAskAgain,
];

export const questions: Question[] = [
  ...reactComponentQuestions,
  ...reactPropQuestions,
];
