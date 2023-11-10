import fs from "node:fs";
import {
  CreatorAnswers,
  CreatorSettings,
} from "@/creatorSettings/creatorSettings.type";
import defaultSettings from "@/creatorSettings/creatorSettings";
import { logger } from "@/helper";
import {
  checkPathAccess,
  defaultSettingsFile,
  getFullPathWithDir,
} from "../fsLibrary/fsLibrary";
import {
  ArgvOptionName,
  defaultArgvValues,
  getArgvOption,
} from "../argvLibrary/argvLibrary";
import { GetProfileReturns } from "./dataLibrary.types";

const log = logger("Data Library");

export const defaultProfile = "";

export function getProfile(): GetProfileReturns {
  const profileName = getArgvOption(ArgvOptionName.profile) as
    | string
    | undefined;
  if (!profileName || profileName === defaultArgvValues.profile) {
    return {
      name: defaultProfile,
      suffix: defaultProfile,
    };
  }

  return {
    name: profileName,
    suffix: `.${profileName}`,
  };
}

export function getCreatorSettings(): CreatorSettings {
  const fullPath = getFullPathWithDir(defaultSettingsFile());
  if (!checkPathAccess(fullPath)) {
    return defaultSettings;
  }

  const settings = fs.readFileSync(fullPath, "utf8");

  try {
    const settingsObj: CreatorSettings = JSON.parse(
      settings
    ) as CreatorSettings;
    return { ...settingsObj };
  } catch (error) {
    log(`Error parsing ${defaultSettingsFile()} file`, error);
    throw new Error(`Error parsing ${defaultSettingsFile()} file`);
  }
}

export function getSpecificPluginSettings(
  settings: CreatorSettings,
  pluginName: string
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
} {
  const pluginSettings = settings.plugins?.find((plugin) => {
    return typeof plugin === "string"
      ? plugin === pluginName
      : plugin.name === pluginName;
  });

  if (!pluginSettings) {
    return {};
  }

  if (typeof pluginSettings === "string") {
    return {};
  }

  return pluginSettings.options;
}

export function getSpecificPluginAnswers(
  answers: CreatorAnswers,
  pluginName: string
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pluginAnswers = answers[pluginName];

  if (!pluginAnswers) {
    return {};
  }

  return pluginAnswers.answers;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestedObject = { [key: string]: any };
export function replaceDefaultsWithDefaultValues(
  target: NestedObject,
  defaultValues: NestedObject,
  path: string[] = []
): NestedObject {
  const newObj: NestedObject = Array.isArray(target) ? [] : {}; // Handle arrays

  for (const [key, value] of Object.entries(target)) {
    const newPath = [...path, key];

    if (value === "__DEFAULT__") {
      let sourceObj: NestedObject = defaultValues;
      let validPath = true;
      for (const pathKey of newPath) {
        if (Object.prototype.hasOwnProperty.call(sourceObj, pathKey)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          sourceObj = sourceObj[pathKey];
        } else {
          validPath = false;
          break;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newObj[key] = validPath ? sourceObj : value;
    } else if (Array.isArray(value)) {
      // Handle arrays
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newObj[key] = [...value];
    } else if (typeof value === "object" && value !== null) {
      newObj[key] = replaceDefaultsWithDefaultValues(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        value,
        defaultValues,
        newPath
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newObj[key] = value;
    }
  }

  return newObj;
}
