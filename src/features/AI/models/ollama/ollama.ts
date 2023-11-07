import { ChatOllama } from "langchain/chat_models/ollama";
import { createQuestionPrompt, extractCodeBlock } from "../../helper";
import { callAgentFnOptions } from "../../interfaces";

function checkEnv(keyName: string) {
  if (!process.env[keyName]) {
    throw new Error(
      `Please set the ${keyName} environment variable to use the Ollama.`
    );
  }
  return process.env[keyName];
}

export async function callAgent({
  componentName,
  componentDescription,
  styleLibrary,
  modelName,
  isTypescript,
}: callAgentFnOptions) {
  if (!checkEnv("OLLAMA_URL")) return;

  const baseUrl = checkEnv("OLLAMA_URL");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOllama({ baseUrl, model: modelName, temperature: 0 });
  const questionPrompt = createQuestionPrompt();
  const questionChain = questionPrompt.pipe(llm);

  const response = await questionChain.invoke({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
  });

  return extractCodeBlock(response.content);
}
