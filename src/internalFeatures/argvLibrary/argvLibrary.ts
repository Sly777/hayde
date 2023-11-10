import { program } from "commander";
import {
  ArgvOptionName,
  ArgvOptions,
  defaultArgvValues,
} from "./argvLibrary.types";

export function prepareArgv(): void {
  // INFO: dont forget to update cli-arguments.md file when you add a new argument
  program
    .description("A CLI tool to generate components quickly and easily.")
    .option("--debug", "output extra debugging", defaultArgvValues.debug)
    .option(
      "--disableTelemetry",
      "disable telemetry (it's not implemented yet)",
      defaultArgvValues.disableTelemetry
    )
    .option(
      "--noFormat",
      "disable formatting on file content",
      defaultArgvValues.noFormat
    )
    .option(
      "--profile <profile>",
      "use a specific profile",
      defaultArgvValues.profile
    );

  program.parse();
}

export function getArgvOptions(): ArgvOptions {
  return program.opts();
}

export function getArgvOption(optionName: ArgvOptionName): string | boolean {
  const options = getArgvOptions();
  return options[optionName];
}

export function getEnvVariable(envVariableName: string): string | undefined {
  return process.env[envVariableName];
}

export function checkEnvVariable(keyName: string, info?: string): string {
  if (!process.env[keyName]) {
    throw new Error(
      `Please set the ${keyName} environment variable to use the ${info}.`
    );
  }
  return process.env[keyName] as string;
}

export {
  ArgvOptionName,
  ArgvOptions,
  defaultArgvValues,
} from "./argvLibrary.types";
