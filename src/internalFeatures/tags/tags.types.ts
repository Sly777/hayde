export const getHtmlStartTag = (tagName: string) =>
  `<!-- #hayde-${tagName} -->`;
export const getHtmlEndTag = (tagName: string) =>
  `<!-- #hayde-end-${tagName} -->`;

export const getJSStartTag = (tagName: string) =>
  `// ${getHtmlStartTag(tagName)}`;
export const getJSEndTag = (tagName: string) => `// ${getHtmlEndTag(tagName)}`;

export enum contentType {
  html = "html",
  css = "css",
  js = "js",
}

export const defaultOptions = {
  type: contentType.js,
};
