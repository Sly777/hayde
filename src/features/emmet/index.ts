/* eslint-disable @typescript-eslint/no-unused-vars */
import expand from "emmet";
import {
  PluginInitParams,
  PluginInitReturn,
} from "@/creatorSettings/creatorSettings.type";
import { IPluginOptions } from "./interfaces";
import { questions } from "./questions";
import inquirer from "inquirer";

export { questions } from "./questions";

export const pluginName = "emmet";

export async function initPlugin({
  options,
  globalOptions,
}: PluginInitParams<IPluginOptions>): Promise<
  PluginInitReturn<IPluginOptions>
> {
  const answers = (await inquirer.prompt(
    questions,
    options,
  )) as Required<IPluginOptions>;

  return {
    answers,
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
      const classes = match.replaceAll(classRegex, "$1").split(" ") as string[];
      classNames = [...classNames, ...classes];
    }
  }

  if (idMatches) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    ids = idMatches.map((match) => match.replaceAll(idRegex, "$1"));
  }

  return { classNames, ids };
}
