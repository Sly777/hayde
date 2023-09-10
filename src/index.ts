#! /usr/bin/env node

import { CliTool } from "./cliTool";
import { prepareArgv } from "./internalFeatures/argvLibrary";

prepareArgv();
const cliTool = new CliTool();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
cliTool.run();
