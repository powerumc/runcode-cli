import {CommandLineParser} from "@microsoft/ts-command-line/lib";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RunCode extends CommandLineParser {
  constructor() {
    super({
      toolFilename: "",
      toolDescription: "runcode"
    });
  }

  protected onDefineParameters(): void {
  }
}
