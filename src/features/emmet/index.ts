/* eslint-disable @typescript-eslint/no-unused-vars */
import expand from "emmet";
import {
  PluginInitParams,
  PluginInitReturn,
  PluginRunParams,
  PluginRunReturn,
} from "@/creatorSettings/creatorSettings.type";
import {
  EmmetArea,
  IPluginOptions,
  IReturns,
  ISettings,
  OutAnswers,
} from "./interfaces";
import { questions } from "./questions";
import inquirer from "inquirer";
import { logger } from "@/helper";

export { defaultSettings } from "./interfaces";

export const pluginName = "emmet";
const log = logger(pluginName);

export async function initPlugin({
  options,
  globalOptions,
}: PluginInitParams<IPluginOptions>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  const answers = (await inquirer.prompt(
    questions,
    options
  )) as Required<IPluginOptions>;

  if (answers.code.includes(answers.componentContentTag)) {
    answers.area = EmmetArea.inside;
  }

  return {
    answers,
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function runPlugin({
  pluginSettings,
  globalSettings,
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>): Promise<PluginRunReturn<IReturns>> {
  const answers = allAnswers.emmet?.answers as Required<ISettings>;
  let { code } = answers;
  const { area, componentContentTag } = answers;

  if (!code) {
    log("No emmet code provided");
    throw new Error("No emmet code provided");
  }

  if (!code.includes(componentContentTag)) {
    // eslint-disable-next-line unicorn/no-lonely-if
    if (area === EmmetArea.inside) {
      code = `${code}{{{componentContent}}}`;
    }
  }

  const htmlContent = expand(code);
  const { classNames, ids } = getClassnamesAndIDs(htmlContent);

  return {
    returns: {
      area,
      classNames,
      ids,
      htmlContent,
    },
  };
}

function getClassnamesAndIDs(html: string): {
  classNames: string[];
  ids: string[];
} {
  const classRegex = /class="([^"]+)"/g;
  const idRegex = /id="([^"]+)"/g;

  const classMatches = html.match(classRegex);
  const idMatches = html.match(idRegex);

  let classNames: string[] = [];
  let ids: string[] = [];

  if (classMatches) {
    for (const match of classMatches) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unnecessary-type-assertion
      const classes = match.replaceAll(classRegex, "$1").split(" ");
      classNames = [...classNames, ...classes];
    }
  }

  if (idMatches) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    ids = idMatches.map((match) => match.replaceAll(idRegex, "$1"));
  }

  return { classNames, ids };
}
