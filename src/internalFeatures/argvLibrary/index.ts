import { program } from "commander";

export function prepareArgv(): void {
  program
    .description("A CLI tool to generate components quickly and easily.")
    .option("--debug", "output extra debugging", false)
    .option("--disableTelemetry", "disable telemetry (it's not implemented yet)", true)
    .option("--noFormat", "disable formatting on file content", false);

  program.parse();
}

type ArgvOptions = {
  debug: boolean;
  noFormat: boolean;
  disableTelemetry: boolean;
};

export function getArgvOptions(): ArgvOptions {
  return program.opts();
}

export enum ArgvOptionName {
  debug = "debug",
  noFormat = "noFormat",
  disableTelemetry = "disableTelemetry",
}

export function getArgvOption(optionName: ArgvOptionName): string | boolean {
  return program.opts()[optionName] as string | boolean;
}

export function getEnvVariable(envVariableName: string): string | undefined {
  return process.env[envVariableName];
}
