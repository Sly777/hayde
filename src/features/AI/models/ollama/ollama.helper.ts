import { checkEnvVariable } from "@/internalFeatures/argvLibrary/argvLibrary";
import { callAgentWithCodeFnOptions } from "../../interfaces";
import { ChatOllama } from "langchain/chat_models/ollama";
import {
  defaultBaseConfig,
  extractCodeBlock,
  getComponentStylebookPrompt,
  getComponentTestFilePrompt,
} from "../../helper";
import { OllamaInput } from "langchain/dist/util/ollama";
import { BaseLanguageModelParams } from "langchain/dist/base_language";

export const defaultConfig: OllamaInput & BaseLanguageModelParams = {
  ...defaultBaseConfig,
  temperature: 0,
};

export async function callAgentForStorybook({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
  componentCode,
}: callAgentWithCodeFnOptions) {
  if (!checkEnvVariable("OLLAMA_URL", "Ollama")) return;

  const baseUrl = checkEnvVariable("OLLAMA_URL");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOllama({ ...defaultConfig, baseUrl, model: modelName });
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
  if (!checkEnvVariable("OLLAMA_URL", "Ollama")) return;

  const baseUrl = checkEnvVariable("OLLAMA_URL");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOllama({ ...defaultConfig, baseUrl, model: modelName });
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
