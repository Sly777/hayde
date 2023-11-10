export const defaultArgvValues = {
  debug: false,
  noFormat: false,
  disableTelemetry: true,
  profile: "default",
};

export type ArgvOptions = {
  debug: boolean;
  noFormat: boolean;
  disableTelemetry: boolean;
  profile: string;
};

export enum ArgvOptionName {
  debug = "debug",
  noFormat = "noFormat",
  disableTelemetry = "disableTelemetry",
  profile = "profile",
}
