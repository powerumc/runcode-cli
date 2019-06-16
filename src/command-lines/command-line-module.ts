import {Module} from "@nestjs/common";
import {RunCode} from "./run-code";
import {RunAction} from "./actions";
import {ServicesModule} from "../services";

const services = [
  RunCode,
  RunAction
];

@Module({
  providers: [...services],
  exports: [...services],
  imports: [ServicesModule]
})
export class CommandLineModule { }
