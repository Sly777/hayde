import fs from "node:fs";
import path from "node:path";
import { prettierFormat } from "@/internalFeatures/prettier";
import Handlebars from "handlebars";
import {
  CreatorAnswers,
  CreatorSettings,
} from "@/creatorSettings/creatorSettings.type";
import { ISettings as GeneralSettings } from "@/features/general/interfaces";
import {
  getSpecificPluginAnswers,
  getSpecificPluginSettings,
} from "../dataLibrary";
import { errorLog } from "@/helper";

export function checkTemplate(
  templateName: string,
  settings: CreatorSettings,
): boolean {
  const generalSettings = getSpecificPluginSettings(settings, "general");
  try {
    if (
      fs.existsSync(
        `${__dirname}${generalSettings.templatesPath}/${templateName}.hbs`,
      )
    ) {
      return true;
    } else if (
      fs.existsSync(
        `${path.dirname("./")}${
          generalSettings.templatesPath
        }/${templateName}.hbs`,
      )
    ) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export async function compileTemplate(
  templateName: string,
  templateFolder: string,
  globalSettings: CreatorSettings,
  data: CreatorAnswers,
  additionalData: object = {},
  prettierEnabled: boolean = true,
) {
  const generalAnswers = getSpecificPluginAnswers(
    data,
    "general",
  ) as GeneralSettings;

  let dirName = __dirname;
  const fileName = `${templateFolder}/${templateName}.hbs`;
  const filePath = `${generalAnswers.templatesPath}/${fileName}`;

  if (!fs.existsSync(`${dirName}${filePath}`)) dirName = path.dirname("./");
  if (!fs.existsSync(`${dirName}${filePath}`)) {
    throw new Error(`Template ${fileName} does not exist.- ${filePath}`);
  }

  const source = fs.readFileSync(`${dirName}${filePath}`, "utf8");
  const template = Handlebars.compile(source, {
    noEscape: true,
    strict: true,
  });
  const compiledTemplate = template({
    ...generalAnswers,
    ...data,
    ...additionalData,
  });

  if (!prettierEnabled) {
    return compiledTemplate;
  }

  try {
    return await prettierFormat(compiledTemplate);
  } catch {
    errorLog(`Error formatting file ${fileName} on Prettier`);
    return compiledTemplate;
  }
}
