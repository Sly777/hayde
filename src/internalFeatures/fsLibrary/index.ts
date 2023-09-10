import fs from "node:fs";
import { CreatorAnswers } from "@/creatorSettings/creatorSettings.type";
import { ISettings as GeneralSettings } from "@/features/general/interfaces";
import { getSpecificPluginAnswers } from "../dataLibrary";

export function checkFolder(folderPath: string): boolean {
  try {
    return fs.existsSync(folderPath) ? true : false;
  } catch {
    return false;
  }
}

export function createFile(
  allAnswers: CreatorAnswers,
  fileName: string = ".ts",
  fileContent: string,
) {
  const generalAnswers = getSpecificPluginAnswers(
    allAnswers,
    "general",
  ) as Required<GeneralSettings>;
  const folderPath = `${generalAnswers.srcFolderLocation}/${generalAnswers.componentName}`;
  const fileFullName = `${generalAnswers.componentName}${fileName}`;
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
