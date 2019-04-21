import {Module} from "@nestjs/common";
import {ApplicationService} from "./application";
import {ApplicationLoggerService} from "./logging";

const services = [
  ApplicationService,
  ApplicationLoggerService
];

@Module({
  providers: [...services],
  exports: [...services]
})
export class ServicesModule { }
