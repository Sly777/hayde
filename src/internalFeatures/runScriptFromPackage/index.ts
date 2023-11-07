import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { logger } from "@/helper";

const log = logger("RSFP");

export enum ScriptNames {
  postComponentCreate = "post-component-creation",
  preComponentCreate = "pre-component-creation",
}

export function runScriptFromPackagejson(scriptName: string) {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (fs.existsSync(packageJsonPath)) {
    // Read package.json
    const packageJsonString = fs.readFileSync(packageJsonPath, "utf8");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const packageJson = JSON.parse(packageJsonString);

    // Check if "scripts" and dynamic script are defined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (packageJson.scripts?.[scriptName]) {
      // Execute command
      exec(`npm run ${scriptName}`, (error, stdout, stderr) => {
        if (error) {
          log(`Error occurred: ${error.message}`);
          return;
        }
        if (stdout) log(`stdout: ${stdout}`);
        if (stderr) log(`stderr: ${stderr}`);
      });
    } else {
      log(`No "${scriptName}" script found in package.json.`);
    }
  } else {
    log("No package.json file found.");
  }
}
