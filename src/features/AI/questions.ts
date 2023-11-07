import { Answers, ListQuestion, Question } from "inquirer";
import { AITools, IPluginOptions } from "./interfaces";
import Separator from "inquirer/lib/objects/separator";

export const qAIChoice: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) => answers.aiTool == undefined,
  type: "list",
  name: "aiTool",
  message: "Which AI Tool do you want to use?",
  default: AITools.openAI,
  choices: Object.keys(AITools),
};

export const qOpenAIModel: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) => answers.aiTool === AITools.openAI && answers.modelName == undefined,
  type: "list",
  name: "modelName",
  message: "Which model do you want to use?",
  default: "gpt-4",
  choices: ["gpt-3.5-turbo", "gpt-4"],
  filter(val: string) {
    return val.toLowerCase();
  },
};


export const qOllamaModel: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.aiTool === AITools.ollama && answers.modelName == undefined,
  type: "input",
  name: "modelName",
  message: "Which model do you want to use?",
  default: "llama2",
  filter(val: string) {
    return val.toLowerCase();
  },
};

export const qAICompDescription: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.compDescription == undefined,
  type: "input",
  name: "compDescription",
  message: "Please describe the component (please write it on one line, multiline is not supported):",
};

export const qAIStyleLibrary: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) => answers.styleLibrary == undefined,
  type: "list",
  name: "styleLibrary",
  message: "Which style library do you want to use?",
  choices: ["Chakra UI", "Material UI", new Separator(), "None"],
  filter(val: string) {
    return val.toLowerCase();
  },
};

export const qAITypescript: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.isTS == undefined,
  type: "confirm",
  name: "isTS",
  message: "Do you want to use typescript?",
  default: true,
};

export const questions: Question[] = [
  qAICompDescription,
  qAIStyleLibrary,
  qAITypescript,
  qAIChoice,
  qOpenAIModel,
  qOllamaModel,
];
