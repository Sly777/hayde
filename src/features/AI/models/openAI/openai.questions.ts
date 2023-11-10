import { Answers, ListQuestion, Question } from "inquirer";
import { AITools, IPluginOptions } from "../../interfaces";
import { OpenAIModels, OpenAITypes, OpenAIVisionTypes } from "./openai.types";
import {
  checkPathAccess,
  isImageUrl,
  isValidUrl,
} from "@/internalFeatures/fsLibrary/fsLibrary";

export const qOpenAIType: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.aiTool === AITools.openAI && answers.openAIType == undefined,
  type: "list",
  name: "openAIType",
  message: "Which way do you want to use openAI?",
  default: OpenAITypes.text,
  choices: Object.values(OpenAITypes),
};

export const qOpenAIModel: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.aiTool === AITools.openAI &&
    answers.modelName == undefined &&
    answers.openAIType == OpenAITypes.text,
  type: "list",
  name: "modelName",
  message: "Which model do you want to use?",
  default: (answers: IPluginOptions) =>
    answers.openAIType === OpenAITypes.vision
      ? OpenAIModels.gpt4V
      : OpenAIModels.gpt4,
  choices: Object.values(OpenAIModels),
};

export const qOpenAIVisionType: ListQuestion<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.aiTool === AITools.openAI &&
    answers.modelName == undefined &&
    answers.openAIType == OpenAITypes.vision,
  type: "list",
  name: "openAIVisionType",
  message: "How do you want to use the image?",
  default: OpenAIVisionTypes.url,
  choices: Object.values(OpenAIVisionTypes),
};

export const qOpenAIVisionUrl: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.aiTool === AITools.openAI &&
    answers.modelName == undefined &&
    answers.openAIVisionType == OpenAIVisionTypes.url,
  type: "input",
  name: "openAIVisionUrl",
  message: "Please provide the url of the image:",
  validate: async (input: string) => {
    if (input.length === 0) {
      return "You must provide a url";
    }
    if (!input.startsWith("http")) {
      return "You must provide a valid url";
    }
    if (!isValidUrl(input)) {
      return "You must provide a valid url";
    }
    const imageCheck = await isImageUrl(input);
    if (!imageCheck) {
      return "You must provide a valid image url";
    }
    return true;
  },
};

export const qOpenAIVisionFileUpload: Question<Answers> = {
  when: (answers: IPluginOptions) =>
    answers.aiTool === AITools.openAI &&
    answers.modelName == undefined &&
    answers.openAIVisionType == OpenAIVisionTypes.fileUpload,
  type: "input",
  name: "openAIVisionFile",
  message: "Please provide the file path of the image (full path):",
  validate: (input: string) => {
    if (input.length === 0) {
      return "You must provide a file path";
    }
    if (!input.startsWith("/")) {
      return "You must provide a valid file path";
    }
    if (!input.endsWith(".png") && !input.endsWith(".jpg")) {
      return "You must provide a valid image file (.jpg or .png)";
    }
    if (!checkPathAccess(input)) {
      return "You must provide a valid file path";
    }
    return true;
  },
};

export const questions: Question[] = [
  qOpenAIType,
  qOpenAIModel,
  qOpenAIVisionType,
  qOpenAIVisionUrl,
  qOpenAIVisionFileUpload,
];
