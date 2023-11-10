import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  createComponentPrompt,
  extractCodeBlock,
  getComponentCreationViaVisionPrompt,
} from "../../helper";
import { ISettings, callAgentFnOptions } from "../../interfaces";
import {
  OpenAIModels,
  OpenAITypes,
  OpenAIVisionTypes,
  callAgentViaVisionFnOptions,
} from "./openai.types";
import { checkEnvVariable } from "@/internalFeatures/argvLibrary/argvLibrary";
import { createVisionPrompt, defaultConfig } from "./openai.helper";

export async function callAgent({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
}: callAgentFnOptions) {
  if (!checkEnvVariable("OPENAI_API_KEY", "OpenAI API")) return;

  const openAIApiKey = checkEnvVariable("OPENAI_API_KEY");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOpenAI({
    ...defaultConfig,
    openAIApiKey,
    modelName,
  });
  const questionPrompt = createComponentPrompt();
  const questionChain = questionPrompt.pipe(llm);

  const response = await questionChain.invoke({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
  });
  const content = response.content;

  return extractCodeBlock(content as string);
}

export async function callAgentViaVision({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
  openAIVisionUrl,
  openAIVisionFile,
  openAIVisionType,
}: callAgentViaVisionFnOptions) {
  if (!checkEnvVariable("OPENAI_API_KEY", "OpenAI API")) return;

  const openAIApiKey = checkEnvVariable("OPENAI_API_KEY");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";
  const isFile = openAIVisionType === OpenAIVisionTypes.fileUpload;
  const imageData = isFile ? openAIVisionFile : openAIVisionUrl;

  const llm = new ChatOpenAI({
    ...defaultConfig,
    openAIApiKey,
    modelName,
  });
  const prompt = getComponentCreationViaVisionPrompt({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
  });
  const fullPrompt = await createVisionPrompt(prompt, imageData, isFile);
  const response = await llm.invoke([fullPrompt]);
  const content = response.content;

  return extractCodeBlock(content as string);
}

export function mappingData(answers: ISettings) {
  if (answers.openAIType === OpenAITypes.vision) {
    answers.modelName = OpenAIModels.gpt4V;
  }

  return answers;
}
