// import prettier from "prettier";
import { ArgvOptionName, getArgvOption } from "../argvLibrary";

// eslint-disable-next-line @typescript-eslint/require-await
export async function prettierFormat(fileContent: string) {
  const argNoPrettier = getArgvOption(ArgvOptionName.noPrettier);

  if (!argNoPrettier) {
    /*     return await prettier.format(fileContent, {
      parser: "typescript",
    }); */
  }

  return fileContent;
}
