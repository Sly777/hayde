import { ChatOpenAI } from "langchain/chat_models/openai";
import { createQuestionPrompt, stripMarkdown } from "../../helper";
import { callAgentFnOptions } from "../../interfaces";

function checkEnv(keyName: string) {
  if (!process.env[keyName]) {
    throw new Error(
      `Please set the ${keyName} environment variable to use the OpenAI API.`
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
  if (!checkEnv("OPENAI_API_KEY")) return;

  const openAIApiKey = checkEnv("OPENAI_API_KEY");
  const isTypescriptStr = isTypescript ? "typescript" : "javascript";

  const llm = new ChatOpenAI({ openAIApiKey, modelName, temperature: 0 });
  const questionPrompt = createQuestionPrompt();
  const questionChain = questionPrompt.pipe(llm);

  const response = await questionChain.invoke({
    componentDescription,
    componentName,
    styleLibrary,
    tsOrJs: isTypescriptStr,
  });

  return stripMarkdown(response.content);
}
