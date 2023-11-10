import { getArgvOptions } from "./internalFeatures/argvLibrary/argvLibrary";

export function titleCase(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function removeUnnecessaryHandlebarsAdditionOnEnd(content: string) {
  if (content.endsWith(";\n")) {
    return content.slice(0, -2);
  }
  return content;
}

export function logger(prefix: string, isError = false, disabled = false) {
  const options = getArgvOptions();
  return (...args: unknown[]) => {
    if (!options.debug) return;
    if (disabled) return;
    if (isError) {
      console.error(`[Hayde/${prefix}]`, ...args);
    } else {
      console.log(`[Hayde/${prefix}]`, ...args);
    }
  };
}

export function publicLog(...args: unknown[]) {
  console.log("⭐", ...args);
}
