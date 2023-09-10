import fs from "node:fs";
import path from "node:path";
import {
  CreatorAnswers,
  CreatorSettings,
} from "@/creatorSettings/creatorSettings.type";
import defaultSettings from "@/creatorSettings/creatorSettings";
import { errorLog } from "@/helper";

export function getCreatorSettings(): CreatorSettings {
  const fullPath = `${path.dirname("./")}/.hayde.json`;
  if (!fs.existsSync(fullPath)) {
    return defaultSettings;
  }

  const settings = fs.readFileSync(fullPath, "utf8");

  try {
    const settingsObj: CreatorSettings = JSON.parse(
      settings
    ) as CreatorSettings;
    return { ...settingsObj };
  } catch (error) {
    errorLog("Error parsing .hayde.json file", error);
    throw new Error("Error parsing .hayde.json file");
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
