export interface CreateFileOptions {
  fullName?: boolean;
  isPluginCreator?: boolean;
  noFormat?: boolean;
}

export const defaultCreateFileOptions: CreateFileOptions = {
  fullName: false,
  isPluginCreator: false,
  noFormat: false,
};

export const defaultSettingsFileName = ".hayde";
export const defaultSettingsFileExtension = ".json";
