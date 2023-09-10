import { Answers, Question } from "inquirer";
import { IPluginOptions } from "./interfaces";
import { StyleLibrary } from "../reactJS/interfaces";

export const qChakraCompName: Question<Answers> = {
  when: (answers: IPluginOptions) => {
    const reactAnswers = answers.answersUntilNow?.reactJS?.answers;
    return (
      !!reactAnswers && reactAnswers.styleLibrary === StyleLibrary.ChakraUI
    );
  },
  type: "input",
  name: "componentName",
  message: "What is the name of the Chakra UI component?",
  default: "Text",
};

export const questions: Question[] = [qChakraCompName];
