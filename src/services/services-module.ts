import {HttpModule, Module} from "@nestjs/common";
import {ApplicationService, HttpConfigService} from "./application";
import {ApplicationLoggerService} from "./logging";
import {ExecuteServiceFactory, HttpExecuteService, WebsocketExecuteService} from "./execution";

const services = [
  ApplicationService,
  ApplicationLoggerService,
  HttpExecuteService,
  WebsocketExecuteService,
  ExecuteServiceFactory
];

@Module({
  imports: [HttpModule.registerAsync({
    useClass: HttpConfigService
  })],
  providers: [...services],
  exports: [...services]
})
export class ServicesModule { }
