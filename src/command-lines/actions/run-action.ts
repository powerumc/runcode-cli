import {CommandLineAction, CommandLineFlagParameter, CommandLineStringParameter} from "@microsoft/ts-command-line/lib";
import {ApplicationLoggerService} from "../../services/logging";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RunAction extends CommandLineAction {

  private isInteractive: CommandLineFlagParameter;
  private language: CommandLineStringParameter;
  private version: CommandLineStringParameter;

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
    });
    this.language = this.defineStringParameter({
      required: true,
      parameterShortName: "-l",
      parameterLongName: "--lang",
      description: "Code's language",
      argumentName: "LANG"
    });
    this.version = this.defineStringParameter({
      required: false,
      parameterShortName: "-v",
      parameterLongName: "--version",
      description: "Compiler version",
      argumentName: "VERSION"
    });
  }

  protected async onExecute() {
    this.logger.debug(`run code: isInteractive=${this.isInteractive.value}`);
  }
}
