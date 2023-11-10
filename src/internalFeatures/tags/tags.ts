import { NodeType, parse } from "node-html-parser";
import fs from "node:fs";
import {
  contentType,
  defaultOptions,
  getHtmlEndTag,
  getHtmlStartTag,
  getJSEndTag,
  getJSStartTag,
} from "./tags.types";

export function appendNewData(
  content: string,
  tagName: string,
  appendedText: string,
  options: { type?: contentType } = {}
) {
  options = { ...defaultOptions, ...options };

  switch (options.type) {
    case contentType.html: {
      return appendNewDataToHtml(content, tagName, appendedText, options);
    }
    case contentType.js: {
      return appendNewDataToJS(content, tagName, appendedText);
    }
  }
}

export function appendNewDataToHtml(
  content: string,
  tagName: string,
  appendedText: string,
  options: { type?: contentType }
) {
  const root = parse(content, { comment: true }); // Parse with comments

  let inTargetCommentBlock = false;

  for (const childNode of root.childNodes) {
    if (childNode.nodeType === NodeType.COMMENT_NODE) {
      if (childNode.rawText === getHtmlStartTag(tagName)) {
        inTargetCommentBlock = true;
      } else if (childNode.rawText === getHtmlEndTag(tagName)) {
        inTargetCommentBlock = false;
      }
    } else {
      if (inTargetCommentBlock) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        childNode.textContent += appendedText;
      }
    }
  }

  const modifiedHtml = root.toString();
  return modifiedHtml;
}

export function appendNewDataToJS(
  filePath: string,
  tagName: string,
  appendedText: string
) {
  let content = fs.readFileSync(filePath, "utf8");
  const commentStart = getJSStartTag(tagName);
  const commentEnd = getJSEndTag(tagName);

  const regex = new RegExp(`(${commentStart})([^]*?)(${commentEnd})`, "g");

  content = content.replace(regex, function (_match, p1, p2, p3) {
    return p1 + `${p2}\n` + appendedText + `${p3}`;
  });

  fs.writeFileSync(filePath, content);
}

export { contentType } from "./tags.types";
