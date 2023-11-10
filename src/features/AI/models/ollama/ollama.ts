import { ChatOllama } from "langchain/chat_models/ollama";
import { createComponentPrompt, extractCodeBlock } from "../../helper";
import { callAgentFnOptions } from "../../interfaces";
import { checkEnvVariable } from "@/internalFeatures/argvLibrary/argvLibrary";
import { defaultConfig } from "./ollama.helper";

export async function callAgent({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
}: callAgentFnOptions) {
  if (!checkEnvVariable("OLLAMA_URL", "Ollama")) return;

  const baseUrl = checkEnvVariable("OLLAMA_URL");
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
  const content = response.content;

  return extractCodeBlock(content as string);
}
