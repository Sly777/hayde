/* eslint-disable @typescript-eslint/no-unused-vars */
import inquirer from "inquirer";
import {
  IPluginOptions,
  ISettings,
  OutAnswers,
  OutReturns,
  StyleLibrary,
} from "./interfaces";
import { reactPropQuestions } from "./questions";
import { PluginRunParams } from "@/creatorSettings/creatorSettings.type";
import { removeUnnecessaryHandlebarsAdditionOnEnd } from "@/helper";
import { compileTemplate } from "@/internalFeatures/templatesLibrary/templatesLibrary";
import { createFile } from "@/internalFeatures/fsLibrary/fsLibrary";

export async function askReactPropsQuestions(
  options: IPluginOptions
): Promise<string[]> {
  const propNames = options.propList ?? [];
  let addMore = true;

  if (propNames.length > 0) return propNames;

  while (addMore) {
    let answer = await inquirer.prompt([reactPropQuestions[0]], options);
    if (answer.propName) propNames.push(answer.propName as string);

    answer = await inquirer.prompt([reactPropQuestions[1]], options);

    addMore = !!answer.propCreationAskAgain;
  }

  return propNames;
}

export async function createInterfaceFile({
  pluginSettings,
  globalSettings,
  allAnswers,
}: PluginRunParams<ISettings, OutAnswers>) {
  const answers = allAnswers.reactJS?.answers as Required<ISettings>;

  if (answers.createInterface) {
    const interfaceContent = await compileTemplate(
      answers.interfaceTemplateName,
      answers.templateFolder,
      globalSettings,
      allAnswers
    );

    createFile(
      allAnswers,
      `${answers.interfaceFileSuffix}.ts`,
      interfaceContent
    );
  }
}

export async function createReactComponentFile({
  pluginSettings,
  globalSettings,
  allAnswers,
  allReturns,
}: PluginRunParams<ISettings, OutAnswers, OutReturns>) {
  const answers = allAnswers.reactJS?.answers as Required<ISettings>;

  const reactImportsContent = await compileTemplate(
    answers.importsTemplateName,
    answers.templateFolder,
    globalSettings,
    allAnswers
  );

  const reactPropsContent = await compileTemplate(
    answers.propsTemplateName,
    answers.templateFolder,
    globalSettings,
    allAnswers
  );

  let reactComponentInsideContent = "";
  switch (answers.styleLibrary) {
    case StyleLibrary.None: {
      reactComponentInsideContent = await compileTemplate(
        answers.componentContentTemplateName,
        answers.templateFolder,
        globalSettings,
        allAnswers
      );
      break;
    }

    case StyleLibrary.ChakraUI: {
      reactComponentInsideContent = await compileTemplate(
        allAnswers.chakraUI.answers.componentContentTemplateName,
        allAnswers.chakraUI.answers.templateFolder,
        globalSettings,
        allAnswers
      );
      break;
    }

    case StyleLibrary.MaterialUI: {
      reactComponentInsideContent = await compileTemplate(
        allAnswers.materialUI.answers.componentContentTemplateName,
        allAnswers.materialUI.answers.templateFolder,
        globalSettings,
        allAnswers
      );
      break;
    }
  }

  reactComponentInsideContent = removeUnnecessaryHandlebarsAdditionOnEnd(
    reactComponentInsideContent
  );

  const reactComponentContent = await compileTemplate(
    answers.componentTemplateName,
    answers.templateFolder,
    globalSettings,
    allAnswers,
    {
      componentContent: reactComponentInsideContent,
    }
  );

  const reactExportsContent = await compileTemplate(
    answers.exportsTemplateName,
    answers.templateFolder,
    globalSettings,
    allAnswers
  );

  const content = `
  ${reactImportsContent}

  ${reactPropsContent}

  ${reactComponentContent}

  ${reactExportsContent}
  `;

  createFile(allAnswers, ".tsx", content);
}
