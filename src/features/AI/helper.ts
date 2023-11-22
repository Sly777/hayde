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
    /```(?:typescript|javascript|react|tsx|jsx)?\n([\S\s]*?)\n```/g;
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
  const styleLibraryStr = styleLibrary
    ? `${styleLibrary} library`
    : "inline css styling";

  return `
    As an expert developer in React, CSS, and ${styleLibraryStr}, create a '${componentName}' component for ${componentDescription}. Use ${tsOrJs} for creating component. Follow these guidelines closely:

    1. The component must replicate the design in the provided image exactly, including layout and styling details.
    2. Pay attention to background color, text color, font size, font family, padding, margin, and borders. Match these exactly to the image.
    3. Use the exact text from the image in the component.
    4. Write full CSS inline, without creating additional files. You may use any standard font.
    5. Avoid placeholder comments. Instead, write complete code for each part of the component. you can repeat elements as needed to match the provided image.
    6. For any images, use placeholders from https://placehold.co. Include descriptive alt text for each image placeholder.
    7. Implement error handling and loading states. Add clear comments for code clarity.
    8. Prefer functional components with hooks for state management. Ensure the component is modular and testable.
    9. Add comments to the code for clarity to other developers.
    10. Valid the code that you created. If it's not correct, please send the correct code.

    Return only the full, complete code of the component.
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
