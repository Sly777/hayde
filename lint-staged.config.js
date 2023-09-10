/* eslint-disable import/no-anonymous-default-export */
export default {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,jsx,ts,tsx}": "eslint --cache --fix ",
  "*.{png,jpeg,jpg,gif,svg}": "imagemin-lint-staged",
};
