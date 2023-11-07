import { ChatOllama } from "langchain/chat_models/ollama";
import {
  createComponentPrompt,
  defaultBaseConfig,
  extractCodeBlock,
} from "../../helper";
import { callAgentFnOptions } from "../../interfaces";
import { OllamaInput } from "langchain/dist/util/ollama";
import { BaseLanguageModelParams } from "langchain/dist/base_language";

function checkEnv(keyName: string) {
  if (!process.env[keyName]) {
    throw new Error(
      `Please set the ${keyName} environment variable to use the Ollama.`
    );
  }
  return process.env[keyName];
}

const defaultConfig: OllamaInput & BaseLanguageModelParams = {
  ...defaultBaseConfig,
  temperature: 0,
};

export async function callAgent({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
}: callAgentFnOptions) {
  if (!checkEnv("OLLAMA_URL")) return;

  const baseUrl = checkEnv("OLLAMA_URL") as string;
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOllama({ ...defaultConfig, baseUrl, model: modelName });
  const questionPrompt = createComponentPrompt();
  const questionChain = questionPrompt.pipe(llm);

  const response = await questionChain.invoke({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
  });

  return extractCodeBlock(response.content);
}
