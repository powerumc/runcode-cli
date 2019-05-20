import {IExecuteService, IFilesRequest, IFilesResponse} from "./interfaces";
import {HttpService, Injectable} from "@nestjs/common";

@Injectable()
export class HttpExecuteService implements IExecuteService {

  constructor(private http: HttpService) {
  }

  execute(request: IFilesRequest): Promise<IFilesResponse> {
    return this.http.post<IFilesResponse>("/api/v1/code/run", request)
      .toPromise()
      .then(o => o.data);
  }

}
