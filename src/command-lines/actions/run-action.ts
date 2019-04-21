import {CommandLineAction, CommandLineFlagParameter} from "@microsoft/ts-command-line/lib";
import {ApplicationLoggerService} from "../../services/logging";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RunAction extends CommandLineAction {

  private isInteractive: CommandLineFlagParameter;

  constructor(private logger: ApplicationLoggerService) {
    super({
      actionName: "run",
      documentation: "run your code",
      summary: ""
    });
  }

  protected onDefineParameters(): void {
    this.isInteractive = this.defineFlagParameter({
      required: false,
      parameterShortName: "-i",
      parameterLongName: "--interactive",
      description: "interactive with stdin/stdout"
    })
  }

  protected async onExecute() {
    this.logger.debug(`run code: isInteractive=${this.isInteractive.value}`);
  }
}
