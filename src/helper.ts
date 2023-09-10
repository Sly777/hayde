import { getArgvOptions } from "./internalFeatures/argvLibrary";

export function titleCase(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function removeUnnecessaryHandlebarsAdditionOnEnd(content: string) {
  if (content.endsWith(";\n")) {
    return content.slice(0, -2);
  }
  return content;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...params: any[]): void {
  const options = getArgvOptions();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (options.debug) console.log(...params);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorLog(...params: any[]): void {
  const options = getArgvOptions();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (options.debug) console.error(...params);
}
