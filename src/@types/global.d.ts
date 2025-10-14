declare module "*.png";
declare module "*.ico";
declare module "*.svg";
declare module "*.jpg";

declare interface Window {
    sysDebug: string
    sysRuntimeMode: string
    sysVersion: string
    sysBuildDate: string
    contentPath: string
    localStorageExpiry: number
}

type IResultType = "SUCCESS" | "ERROR" | "WARNING" | "FAILED";

type RequestObject<T = any, M = Record<string, any>> = {
  resultType?: IResultType;
  resultMessage?: string;
  dataContent: T;
  metaData?: M & {
    version: string;
    redis?: boolean;
    [key: string]: any;
  };
};

type ResultObject<T = any, M = Record<string, any>> = {
  resultType: IResultType;
  resultMessage?: string;
  dataContent?: T;
  metaData?: M & {
    version: string;
    redis?: boolean;
    [key: string]: any;
  };
};

