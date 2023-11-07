import { ChatOpenAI, OpenAIChatInput } from "langchain/chat_models/openai";
import {
  createComponentPrompt,
  defaultBaseConfig,
  stripMarkdown,
} from "../../helper";
import { callAgentFnOptions } from "../../interfaces";
import { BaseLanguageModelParams } from "langchain/dist/base_language";

function checkEnv(keyName: string) {
  if (!process.env[keyName]) {
    throw new Error(
      `Please set the ${keyName} environment variable to use the OpenAI API.`
    );
  }
  return process.env[keyName];
}

const defaultConfig: Partial<OpenAIChatInput> & BaseLanguageModelParams = {
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
  if (!checkEnv("OPENAI_API_KEY")) return;

  const openAIApiKey = checkEnv("OPENAI_API_KEY") as string;
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

  return stripMarkdown(response.content);
}
