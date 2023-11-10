import { getArgvOptions } from "@/internalFeatures/argvLibrary/argvLibrary";
import { BaseLanguageModelParams } from "langchain/dist/base_language";
import { PromptTemplate } from "langchain/prompts";

export function stripMarkdown(text: string) {
  const markdownRegex = /(```[a-z]*\n[\S\s]*?\n```)/g;
  return text.replaceAll(markdownRegex, (match, p1: string): string =>
    p1.replaceAll(/```[a-z]*\n|```/g, "").trim()
  );
}

const argvOptions = getArgvOptions();
export const defaultBaseConfig: BaseLanguageModelParams = {
  verbose: argvOptions.debug,
};

export function extractCodeBlock(response: string) {
  const codeBlockRegex =
    /```(?:typescript|javascript|react)?\n([\S\s]*?)\n```/g;
  const codeBlocks = [];
  let match;

  while ((match = codeBlockRegex.exec(response)) !== null) {
    codeBlocks.push(match[1].trim()); // Trim each code block
  }

  return codeBlocks.length > 0 ? codeBlocks.join("\n\n") : response;
}

export function createComponentPrompt() {
  const questionTemplate = `
    Create functional react component with these information on {tsOrJs}.

    Just return {tsOrJs} code to me, don't return any additional information with code. I will handle it. I also don't need any information about how to import the component.

    - component description: '{componentDescription}'
    - component name: '{componentName}'
    - it's using '{styleLibrary}' library for creating component.

    If the library is none, dont use any library.

    Please include error handling, loading states, and comments within the code for clarity. Prefer functional components with hooks for state management over class components. Ensure the code is modular and easily testable.

    If it's typescript, Include type definitions for all props and state objects, and use async/await for asynchronous operations. If it's javascript, use PropTypes for all props and state objects, and use promises for asynchronous operations. If you create props variable or interface, export that variable.

    Before sending response, please verify the code that you created. If it's not correct, please send the correct code.

    Component code:
  `;
  return PromptTemplate.fromTemplate(questionTemplate);
}

export function getComponentCreationViaVisionPrompt({
  tsOrJs,
  componentDescription,
  componentName,
  styleLibrary,
}: {
  tsOrJs: string;
  componentDescription: string;
  componentName: string;
  styleLibrary: string;
}) {
  return `
    Create functional react component with these information on ${tsOrJs} from image.

    Just return ${tsOrJs} code to me, don't return any additional information with code. I will handle it. I also don't need any information about how to import the component.

    - component description: '${componentDescription}'
    - component name: '${componentName}'
    - it's using '${styleLibrary}' library for creating component.

    If the library is none, dont use any library.

    Please include error handling, loading states, and comments within the code for clarity. Prefer functional components with hooks for state management over class components. Ensure the code is modular and easily testable.

    If it's typescript, Include type definitions for all props and state objects, and use async/await for asynchronous operations. If it's javascript, use PropTypes for all props and state objects, and use promises for asynchronous operations. If you create props variable or interface, export that variable.

    Before sending response, please verify the code that you created. If it's not correct, please send the correct code.
  `;
}

export function getComponentStylebookPrompt() {
  const questionTemplate = `
    Write storybook file (story file) from this code on {tsOrJs}. Use version 7 or higher of storybook.

    Just return {tsOrJs} code to me, don't return any additional information with code. I will handle it. I also don't need any information about how to import the component.

    - component description: '{componentDescription}'
    - component name: '{componentName}'

    Before sending response, please verify the code that you created. If it's not correct, please send the correct code.

    Component code is below.

    {componentCode}

    Story code:
  `;
  return PromptTemplate.fromTemplate(questionTemplate);
}

export function getComponentTestFilePrompt() {
  const questionTemplate = `
    Write test file (story file) from this code on {tsOrJs}. Please use jest for testing.

    Just return {tsOrJs} code to me, don't return any additional information with code. I will handle it. I also don't need any information about how to import the component.

    - component description: '{componentDescription}'
    - component name: '{componentName}'

    Before sending response, please verify the code that you created. If it's not correct, please send the correct code.

    Component code is below.

    {componentCode}

    Test code:
  `;
  return PromptTemplate.fromTemplate(questionTemplate);
}