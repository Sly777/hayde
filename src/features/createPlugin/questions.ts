import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";

export const qPluginName: Question<Answers> = {
  when: (answers: IPluginOptions) => answers.pluginName == undefined,
  type: "input",
  name: "pluginName",
  message: "What is the name of your plugin?",
};

export const questions: Question[] = [qPluginName];
