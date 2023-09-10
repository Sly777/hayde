export interface IPluginOptions {
  srcFolderLocation?: string;
  isFolderAvailable?: boolean;
  componentName?: string;
}

export interface ISettings extends IPluginOptions {
  templatesPath: string;
}

export const defaultSettings: ISettings = {
  templatesPath: "/templates",
};
