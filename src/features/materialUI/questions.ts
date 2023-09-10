import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";
import { StyleLibrary } from "../reactJS/interfaces";

export const qMaterialCompName: Question<Answers> = {
  when: (answers: IPluginOptions) => {
    const reactAnswers = answers.answersUntilNow?.reactJS?.answers;
    return (
      !!reactAnswers && reactAnswers.styleLibrary === StyleLibrary.MaterialUI
    );
  },
  type: "input",
  name: "componentName",
  message: "What is the name of the Material UI component?",
  default: "Text",
};

export const questions: Question[] = [qMaterialCompName];
