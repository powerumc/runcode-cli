import {Module} from "@nestjs/common";
import {CommandLineModule} from "./command-lines";
import {ServicesModule} from "./services";

@Module({
  imports: [
    CommandLineModule,
    ServicesModule
  ]
})
export class AppModule { }
