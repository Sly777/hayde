import { Answers, Question } from "inquirer";
import { AITools, IPluginOptions } from "../../interfaces";

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

export const questions: Question[] = [qOllamaModel];
