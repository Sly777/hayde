import { HumanMessage } from "langchain/schema";
import * as fs from "node:fs/promises";
import { callAgentWithCodeFnOptions } from "../../interfaces";
import { checkEnvVariable } from "@/internalFeatures/argvLibrary/argvLibrary";
import { ChatOpenAI, OpenAIChatInput } from "langchain/chat_models/openai";
import {
  defaultBaseConfig,
  extractCodeBlock,
  getComponentStylebookPrompt,
  getComponentTestFilePrompt,
} from "../../helper";
import { BaseLanguageModelParams } from "langchain/dist/base_language";
import { OpenAIModels } from "./openai.types";

export const defaultConfig: Partial<OpenAIChatInput> & BaseLanguageModelParams =
  {
    ...defaultBaseConfig,
    temperature: 0,
    maxTokens: 2048,
  };

export async function createVisionPrompt(
  prompt: string,
  imagePath: string,
  isFile: boolean = false
): Promise<HumanMessage> {
  let data: { type: "image_url"; image_url: { url: string } | string };

  if (isFile) {
    const imageData = await fs.readFile(imagePath);
    data = {
      type: "image_url"!,
      image_url: {
        url: `data:image/jpeg;base64,${imageData.toString("base64")}`,
      },
    };
  } else {
    data = {
      type: "image_url",
      image_url: imagePath,
    };
  }

  const hostedImageMessage = new HumanMessage({
    content: [
      {
        type: "text",
        text: prompt,
      },
      data,
    ],
  });

  return hostedImageMessage;
}

export async function callAgentForStorybook({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
  componentCode,
}: callAgentWithCodeFnOptions) {
  if (!checkEnvVariable("OPENAI_API_KEY", "OpenAI API")) return;

  const openAIApiKey = checkEnvVariable("OPENAI_API_KEY");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOpenAI({
    ...defaultConfig,
    openAIApiKey,
    modelName: OpenAIModels.gpt4,
  });
  const questionPrompt = getComponentStylebookPrompt();
  const questionChain = questionPrompt.pipe(llm);

  const response = await questionChain.invoke({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
    componentCode,
  });
  const content = response.content;

  return extractCodeBlock(content as string);
}

export async function callAgentForTesting({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
  componentCode,
}: callAgentWithCodeFnOptions) {
  if (!checkEnvVariable("OPENAI_API_KEY", "OpenAI API")) return;

  const openAIApiKey = checkEnvVariable("OPENAI_API_KEY");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOpenAI({
    ...defaultConfig,
    openAIApiKey,
    modelName: OpenAIModels.gpt4,
  });
  const questionPrompt = getComponentTestFilePrompt();
  const questionChain = questionPrompt.pipe(llm);

  const response = await questionChain.invoke({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
    componentCode,
  });
  const content = response.content;

  return extractCodeBlock(content as string);
}
