export enum OpenAITypes {
  vision = "vision",
  text = "text",
}

export enum OpenAIModels {
  gpt35T = "gpt-3.5-turbo",
  gpt4 = "gpt-4",
  gpt4V = "gpt-4-vision-preview",
}

export interface IOpenAIOptions {
  openAIType?: OpenAITypes;
  modelName?: OpenAIModels;
  openAIVisionType?: OpenAIVisionTypes;
  openAIVisionUrl?: string;
  openAIVisionFile?: string;
}

export enum OpenAIVisionTypes {
  url = "url",
  fileUpload = "fileUpload",
}

export type callAgentViaVisionFn = (
  options: callAgentViaVisionFnOptions
) => Promise<string>;

export type callAgentViaVisionFnOptions = {
  componentName: string;
  componentDescription: string;
  styleLibrary: string;
  modelName: string;
  isTypescript: boolean;
  openAIVisionType: OpenAIVisionTypes;
  openAIVisionUrl: string;
  openAIVisionFile: string;
};
