import fs from "node:fs";
import { CreatorAnswers } from "@/creatorSettings/creatorSettings.type";
import { ISettings as GeneralSettings } from "@/features/general/interfaces";
import { ISettings as PluginCreatorSettings } from "@/features/createPlugin/interfaces";
import {
  getProfile,
  getSpecificPluginAnswers,
} from "../dataLibrary/dataLibrary";
import { formatContent } from "../contentFormatter/contentFormatter";
import path from "node:path";
import { logger } from "@/helper";
import {
  CreateFileOptions,
  defaultCreateFileOptions,
  defaultSettingsFileExtension,
  defaultSettingsFileName,
} from "./fsLibrary.types";
import axios from "axios";

const log = logger("FS Library");

export const defaultSettingsFile = () =>
  `${defaultSettingsFileName}${
    getProfile().suffix
  }${defaultSettingsFileExtension}`;
export const defaultFolderPath = () => path.dirname("./");

export function initFSLibrary() {
  log(`defaultFolderPath: ${defaultFolderPath()}`);
}

export function checkPathAccess(filePath: string): boolean {
  try {
    const isFileAccessible = fs.existsSync(filePath);
    log(`checking path access:`, filePath, isFileAccessible);
    return isFileAccessible;
  } catch {
    log(`error on access: ${filePath}`);
    return false;
  }
}

export function createFile(
  allAnswers: CreatorAnswers,
  fileName: string = ".ts",
  fileContent: string,
  options?: CreateFileOptions
) {
  options = { ...defaultCreateFileOptions, ...options };

  const generalAnswers = getSpecificPluginAnswers(
    allAnswers,
    "general"
  ) as Required<GeneralSettings>;

  const pluginCreator: {
    createPlugin?: Partial<PluginCreatorSettings>;
  } = {};
  if (options.isPluginCreator) {
    pluginCreator.createPlugin = allAnswers.createPlugin?.answers;
  }

  const folderPath =
    options.isPluginCreator && pluginCreator.createPlugin
      ? `${pluginCreator.createPlugin.srcFolderLocation}/${pluginCreator.createPlugin.pluginName}`
      : `${generalAnswers.srcFolderLocation}/${generalAnswers.componentName}`;
  const fileFullName = options.fullName
    ? `${fileName}`
    : `${generalAnswers.componentName}${fileName}`;
  const fullPath = `${folderPath}/${fileFullName}`;

  if (!checkPathAccess(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  try {
    fs.writeFileSync(fullPath, formatContent(fileContent, options.noFormat));
  } catch {
    throw new Error(`Error creating file ${fileName} - ${fullPath}`);
  }
}

export function getFullPathWithDir(filePath: string): string {
  return `${defaultFolderPath()}/${filePath}`;
}

export async function isImageUrl(url: string): Promise<boolean> {
  try {
    const headResponse = await axios.head(url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const contentType: string | undefined =
      headResponse.headers["content-type"];
    if (typeof contentType === "string" && contentType.startsWith("image/")) {
      return true;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status !== 405) {
        return false;
      }

      try {
        const getResponse = await axios.get(url, { responseType: "stream" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const contentType: string | undefined =
          getResponse.headers["content-type"];
        if (
          typeof contentType === "string" &&
          contentType.startsWith("image/")
        ) {
          return true;
        }
        return false;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          log("Error fetching the URL:", error.message);
        } else {
          log("An unexpected error occurred:", error);
        }
        return false;
      }
    } else {
      log("An unexpected error occurred:", error);
      return false;
    }
  }
}

export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

export {
  defaultSettingsFileName,
  defaultSettingsFileExtension,
} from "./fsLibrary.types";
