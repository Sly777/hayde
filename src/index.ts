#! /usr/bin/env node
import { resolve } from "node:path";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({
  path: resolve(process.cwd(), ".env.local"),
  override: true,
});

import { CliTool } from "./cliTool";
import { prepareArgv } from "./internalFeatures/argvLibrary";

prepareArgv();
const cliTool = new CliTool();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
cliTool.run();
