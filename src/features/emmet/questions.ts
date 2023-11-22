import { Answers, ListQuestion, Question } from "inquirer";
import { EmmetArea, IPluginOptions } from "./interfaces";

export const qEmmetCode: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.code == undefined || answers.code === "",
  type: "input",
  name: "code",
  message: "Enter Emmet code: ",
};

export const qEmmetArea: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) => {
    return (
      answers.area == undefined ||
      !answers.code?.includes(answers.componentContentTag ?? "")
    );
  },
  type: "list",
  name: "area",
  message: "Which area do you want to place the component on this emmet code?",
  choices: [EmmetArea.inside, EmmetArea.outside],
};

export const questions: (Question | ListQuestion)[] = [qEmmetCode, qEmmetArea];
