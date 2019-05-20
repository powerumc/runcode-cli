export type File = string;

export interface IFile {
  name: string;
  value: File | IFile[];
}

export interface IFilesRequest {
  language: string;
  version?: string;
  files: IFile[],
  options: {
    isInteractive: boolean;
  }
}

export interface IFilesResponse {
  success: boolean;
  result: IExecuteResult;
}

export interface IExecuteResult {
  stderr: string;
  stdout: string;
  success: boolean;
  elapsed?: number;
}

export interface IExecuteService {
  execute(request: IFilesRequest): Promise<IFilesResponse>;
}
