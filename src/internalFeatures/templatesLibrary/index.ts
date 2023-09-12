import fs from "node:fs";
import path from "node:path";
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

export function addAdditionalHelpers() {
  Handlebars.registerHelper({
    isObject: function (value) {
      return typeof value === "object";
    },
    blockHelperMissing: function (context, options) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return options.data.root[options.name] === undefined ? false : true;
    },
  });
}

export function checkTemplate(
  templateName: string,
  settings: CreatorSettings
): boolean {
  const generalSettings = getSpecificPluginSettings(settings, "general");
  try {
    if (
      fs.existsSync(
        `${__dirname}${generalSettings.templatesPath}/${templateName}.hbs`
      )
    ) {
      return true;
    } else if (
      fs.existsSync(
        `${path.dirname("./")}${
          generalSettings.templatesPath
        }/${templateName}.hbs`
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

// eslint-disable-next-line @typescript-eslint/require-await
export async function compileTemplate(
  templateName: string,
  templateFolder: string,
  globalSettings: CreatorSettings,
  allAnswers: CreatorAnswers,
  additionalData: object = {}
): Promise<string> {
  const generalAnswers = getSpecificPluginAnswers(
    allAnswers,
    "general"
  ) as GeneralSettings;

  let dirName = __dirname;
  const fileName = `${templateFolder}/${templateName}.hbs`;
  const filePath = generalAnswers.templatesPath
    ? `${generalAnswers.templatesPath}/${fileName}`
    : fileName;

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
    ...allAnswers,
    ...additionalData,
  });

  return compiledTemplate;
}
