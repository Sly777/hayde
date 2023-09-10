/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  root: true,
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-module": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: [
          "^lint-staged.config\\.js$",
          "\\.d.ts$",
          /^ignore/i,
          /^vendor/i,
        ],
      },
    ],
  },
};
