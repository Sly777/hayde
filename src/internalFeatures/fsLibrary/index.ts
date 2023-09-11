import fs from "node:fs";
import { CreatorAnswers } from "@/creatorSettings/creatorSettings.type";
import { ISettings as GeneralSettings } from "@/features/general/interfaces";
import { ISettings as PluginCreatorSettings } from "@/features/createPlugin/interfaces";
import { getSpecificPluginAnswers } from "../dataLibrary";

export function checkFolder(folderPath: string): boolean {
  try {
    return fs.existsSync(folderPath) ? true : false;
  } catch {
    return false;
  }
}

interface CreateFileOptions {
  fullName?: boolean;
  isPluginCreator?: boolean;
}

const defaultCreateFileOptions: CreateFileOptions = {
  fullName: false,
  isPluginCreator: false,
};

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

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  try {
    fs.writeFileSync(fullPath, fileContent);
  } catch {
    throw new Error(`Error creating file ${fileName} - ${fullPath}`);
  }
}
