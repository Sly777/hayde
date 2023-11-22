/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
} from "../../creatorSettings/creatorSettings.type";
import { AITools, IPluginOptions, ISettings, OutAnswers } from "./interfaces";
import inquirer from "inquirer";
import { questions } from "./questions";
import { logger, publicLog } from "@/helper";
import { createFile } from "@/internalFeatures/fsLibrary/fsLibrary";
import ora from "ora";
import {
  callAgentViaVision,
  mappingData as mappingOpenAIData,
  callAgent as openAICallAgent,
} from "./models/openAI/openai";
import { callAgent as ollamaCallAgent } from "./models/ollama/ollama";
import {
  callAgentForStorybook as openAICallAgentForStorybook,
  callAgentForTesting as openAICallAgentForTesting,
} from "./models/openAI/openai.helper";
import {
  callAgentForStorybook as ollamaCallAgentForStorybook,
  callAgentForTesting as ollamaCallAgentForTesting,
} from "./models/ollama/ollama.helper";
import { OpenAITypes } from "./models/openAI/openai.types";

export { questions } from "./questions";
export { defaultSettings } from "./interfaces";

export const pluginName = "AI";
const log = logger(pluginName);

export async function initPlugin({
  options,
}: PluginInitParams<IPluginOptions, OutAnswers>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  publicLog(
    "Before starting, please make sure that you added required ENV variables to your .env file."
  );
  let answers = (await inquirer.prompt(
    questions,
    options
  )) as Required<ISettings>;

  switch (answers.aiTool) {
    case AITools.openAI: {
      answers = mappingOpenAIData(answers) as Required<ISettings>;
      break;
    }
    case AITools.ollama: {
      break;
    }
  }

  return {
    answers,
  };
}

export async function runPlugin({
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn> {
  const aiAnswers = allAnswers.AI?.answers as Required<ISettings>;
  const generalAnswers = allAnswers.general?.answers;

  log("Answers:", aiAnswers);

  console.log("\n");
  const spinner = ora({
    text: "Waiting for AI answer",
    spinner: "point",
  }).start();

  const reqData = {
    componentName: generalAnswers.componentName!,
    componentDescription: aiAnswers.compDescription,
    styleLibrary: aiAnswers.styleLibrary,
    modelName: aiAnswers.modelName as string,
    isTypescript: aiAnswers.isTS,
    openAIVisionType: aiAnswers.openAIVisionType,
    openAIVisionUrl: aiAnswers.openAIVisionUrl,
    openAIVisionFile: aiAnswers.openAIVisionFile,
  };
  const aiTool = aiAnswers.aiTool;
  let response;

  switch (aiTool) {
    case AITools.openAI: {
      switch (aiAnswers.openAIType) {
        case OpenAITypes.text: {
          response = await openAICallAgent(reqData);
          break;
        }
        case OpenAITypes.vision: {
          response = await callAgentViaVision(reqData);
          break;
        }
      }
      break;
    }
    case AITools.ollama: {
      response = await ollamaCallAgent(reqData);
      break;
    }
  }

  log("AI response:", response);

  spinner.succeed("AI answer received");
  createFile(allAnswers, aiAnswers.isTS ? ".tsx" : ".jsx", response as string, {
    noFormat: true,
  });

  if (aiAnswers.aiCreateStorybook) {
    const spStorybook = ora({
      text: "Storybook: Waiting for AI answer",
      spinner: "point",
    }).start();
    let storybookResponse;

    switch (aiTool) {
      case AITools.openAI: {
        storybookResponse = await openAICallAgentForStorybook({
          ...reqData,
          componentCode: response as string,
        });
        break;
      }
      case AITools.ollama: {
        storybookResponse = await ollamaCallAgentForStorybook({
          ...reqData,
          componentCode: response as string,
        });
        break;
      }
    }

    log("Storybook response:", storybookResponse);
    spStorybook.succeed("Storybook: AI answer received");
    createFile(
      allAnswers,
      aiAnswers.isTS ? ".stories.tsx" : ".stories.jsx",
      storybookResponse as string
    );
  }

  if (aiAnswers.aiCreateTest) {
    const spTest = ora({
      text: "Testing: Waiting for AI answer",
      spinner: "point",
    }).start();
    let testResponse;

    switch (aiTool) {
      case AITools.openAI: {
        testResponse = await openAICallAgentForTesting({
          ...reqData,
          componentCode: response as string,
        });
        break;
      }
      case AITools.ollama: {
        testResponse = await ollamaCallAgentForTesting({
          ...reqData,
          componentCode: response as string,
        });
        break;
      }
    }

    log("Testing response:", testResponse);
    spTest.succeed("Testing: AI answer received");
    createFile(
      allAnswers,
      aiAnswers.isTS ? ".test.tsx" : ".test.jsx",
      testResponse as string
    );
  }
}
