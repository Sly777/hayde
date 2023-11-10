import { Answers, ListQuestion, Question } from "inquirer";
import { AITools, IPluginOptions } from "./interfaces";
import Separator from "inquirer/lib/objects/separator";
import { questions as openAIQuestions } from "./models/openAI/openai.questions";
import { questions as ollamaQuestions } from "./models/ollama/ollama.questions";

export const qAIChoice: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) => answers.aiTool == undefined,
  type: "list",
  name: "aiTool",
  message: "Which AI Tool do you want to use?",
  default: AITools.openAI,
  choices: Object.keys(AITools),
};

export const qAICompDescription: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.compDescription == undefined,
  type: "input",
  name: "compDescription",
  message:
    "Please describe the component (please write it on one line, multiline is not supported):",
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

export const qCreateStorybook: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.aiCreateStorybook == undefined,
  type: "confirm",
  name: "aiCreateStorybook",
  message: "Do you want to use storybook?",
  default: false,
};

export const qCreateTestFile: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.aiCreateTest == undefined,
  type: "confirm",
  name: "aiCreateTest",
  message: "Do you want test file?",
  default: false,
};

export const questions: Question[] = [
  qAICompDescription,
  qAIStyleLibrary,
  qAITypescript,
  qCreateStorybook,
  qCreateTestFile,
  qAIChoice,
  ...openAIQuestions,
  ...ollamaQuestions,
];
