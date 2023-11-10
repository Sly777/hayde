import { ArgvOptionName, getArgvOption } from "../argvLibrary/argvLibrary";
import js_beautify from "js-beautify";

const jsBeautifyOptions: js_beautify.JSBeautifyOptions = {
  indent_size: 2,
  indent_char: " ",
  max_preserve_newlines: 2,
  preserve_newlines: true,
  keep_array_indentation: false,
  break_chained_methods: false,
  brace_style: "preserve-inline",
  space_before_conditional: true,
  unescape_strings: false,
  jslint_happy: true,
  end_with_newline: true,
  wrap_line_length: 0,
  comma_first: false,
  e4x: true,
  indent_empty_lines: false,
};

export function formatContent(fileContent: string, noFormat: boolean = false) {
  const argNoFormat = getArgvOption(ArgvOptionName.noFormat);

  if (!argNoFormat && !noFormat) {
    return js_beautify(fileContent, jsBeautifyOptions);
  }

  return fileContent;
}
