import { program } from "commander";

export function prepareArgv(): void {
  program
    .description("A CLI tool to generate components quickly and easily.")
    .option("--debug", "output extra debugging", false)
    .option("--noPrettier", "disable prettier formatting", false);

  program.parse();
}

type ArgvOptions = {
  debug: boolean;
};

export function getArgvOptions(): ArgvOptions {
  return program.opts();
}

export enum ArgvOptionName {
  debug = "debug",
  noPrettier = "noPrettier",
}

export function getArgvOption(optionName: ArgvOptionName): string | boolean {
  return program.opts()[optionName] as string | boolean;
}
