import {IExecuteService, IFilesRequest, IFilesResponse} from "./interfaces";
import * as io from "socket.io-client";
import {ApplicationLoggerService} from "../logging";
import {Injectable, OnModuleDestroy} from "@nestjs/common";

@Injectable()
export class WebsocketExecuteService implements IExecuteService, OnModuleDestroy {

  private socket: SocketIOClient.Socket;

  constructor(private logger: ApplicationLoggerService) {

  }

  execute(request: IFilesRequest): Promise<IFilesResponse> {

    return new Promise<IFilesResponse>((resolve, reject) => {
      this.socket = io.connect("http://localhost:15000");
      this.socket.on("connect", () => {
        this.logger.info("connected");

        this.socket.emit("run", request);

        process.stdin.on("data", data => {
          this.socket.emit("stdin", data.toString());
        });

      });
      this.socket.on("stdout", data => {
        console.log(data);
      });
      this.socket.on("message", data => {
        console.log(data);
      });
      this.socket.on("run-result", data => {
        resolve(data);
      });
      this.socket.on("exception", data => {
        reject(data);
      });
      this.socket.on("disconnect", () => {
        this.logger.info("Disconnected");
      });
    });

  }

  onModuleDestroy(): any {
    if (this.socket) {
      this.socket.close();
    }
  }
}
