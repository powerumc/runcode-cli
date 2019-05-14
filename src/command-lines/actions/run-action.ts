import {CommandLineAction, CommandLineFlagParameter, CommandLineStringParameter} from "@microsoft/ts-command-line/lib";
import {ApplicationLoggerService} from "../../services/logging";
import {Injectable} from "@nestjs/common";
import * as io from "socket.io-client";

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

    const socket = io.connect("http://localhost:15000/sapi/v1");
    socket.on("connect", () => {
      this.logger.info("connected");

      const request = {
        "language": "cs",
        "files": [
          {
            "name": "a.cs",
            "value": "using System;\nnamespace HelloWorld\n{\n    class Hello \n    {\n        static void Main() \n        {\n            Console.WriteLine(\"Hello World!\");\n\n            // Keep the console window open in debug mode.\n            Console.WriteLine(\"Press any key to exit.\");\n            Console.ReadKey();\n        }\n    }\n}"
          },
          {
            "name": "dd",
            "value": [
              {
                "name": "b.cs",
                "value": ""
              }
            ]
          }
        ]
      };
      // socket.emit("code", request);
      socket.emit("ping");
      this.logger.info("send ping");
    });

    socket.on("pong", data => {
      this.logger.info(data);
    });
    socket.on("event", data => {
      this.logger.info(data);
    });
    socket.on("/sapi/code", data => {
      this.logger.info(data);
    });
    socket.on("disconnect", () => {
      this.logger.info("Disconnected");
    });
  }
}
