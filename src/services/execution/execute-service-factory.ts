import {Injectable} from "@nestjs/common";
import {IExecuteService, IFilesRequest} from "./interfaces";
import {ApplicationService} from "../application";
import {WebsocketExecuteService} from "./websocket-execute-service";
import {HttpExecuteService} from "./http-execute-service";

@Injectable()
export class ExecuteServiceFactory {

  constructor(private app: ApplicationService) {
  }

  create(request: IFilesRequest): IExecuteService {
    if (request.options.isInteractive) {
      return this.app.get(WebsocketExecuteService);
    }

    return this.app.get(HttpExecuteService);
  }

}
