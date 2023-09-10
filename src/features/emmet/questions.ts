import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";

export const qEmmetCode: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.code == undefined || answers.code === "",
  type: "input",
  name: "code",
  message: "Enter Emmet code: ",
};

export const questions: Question[] = [qEmmetCode];
