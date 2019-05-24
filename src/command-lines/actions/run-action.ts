import {CommandLineAction, CommandLineFlagParameter, CommandLineStringParameter} from "@microsoft/ts-command-line/lib";
import {ApplicationLoggerService} from "../../services/logging";
import {Injectable} from "@nestjs/common";
import {ExecuteServiceFactory} from "../../services/execution";

@Injectable()
export class RunAction extends CommandLineAction {

  private isInteractive: CommandLineFlagParameter;
  private language: CommandLineStringParameter;
  private version: CommandLineStringParameter;
  private result: CommandLineFlagParameter;

  constructor(private logger: ApplicationLoggerService,
              private executeFactory: ExecuteServiceFactory) {
    super({
      actionName: "run",
      documentation: "Run your code",
      summary: ""
    });
  }

  protected onDefineParameters(): void {
    this.isInteractive = this.defineFlagParameter({
      required: false,
      parameterShortName: "-i",
      parameterLongName: "--interactive",
      description: "Interactive with stdin/stdout"
    });
    this.language = this.defineStringParameter({
      required: true,
      parameterShortName: "-l",
      parameterLongName: "--lang",
      description: "Language",
      argumentName: "LANG"
    });
    this.version = this.defineStringParameter({
      required: false,
      parameterShortName: "-v",
      parameterLongName: "--version",
      description: "Compiler version",
      argumentName: "VERSION"
    });
    this.result = this.defineFlagParameter({
      required: false,
      parameterShortName: "-r",
      parameterLongName: "--result",
      description: "Code execution result"
    });
  }

  protected async onExecute() {
    try {
      // const request = {
      //   "language": "cs",
      //   "options": {
      //     "isInteractive": this.isInteractive.value
      //   },
      //   "files": [
      //     {
      //       "name": "a.cs",
      //       "value": "using System;class MainClass { public static void Main (string[] args) { Console.WriteLine (\"Hello World\"); Console.Write(\"Input your name: \"); var name = Console.ReadLine(); Console.WriteLine($\"Your name is {name}\"); } }"
      //     },
      //     {
      //       "name": "dd",
      //       "value": [
      //         {
      //           "name": "b.cs",
      //           "value": ""
      //         }
      //       ]
      //     }
      //   ]
      // };
      const request = {
        "language": "c",
        "options": {
          "isInteractive": this.isInteractive.value
        },
        "files": [
          {
            "name": "a.c",
            "value": "#include <stdio.h>\n\nint main(void) {\n  printf(\"Hello World\\n\");\n  printf(\"Input your name: \");\n  char s[256];\n  scanf(\"%s\", s);\n  printf(\"Your name is %s\\n\", s);\n  return 0;\n}"
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

      const executeService = this.executeFactory.create(request);
      const result = await executeService.execute(request);

      if (result && result.result) {
        if (result.result.stderr) {
          console.log(result.result.stderr);
        }
        if (result.result.stdout) {
          console.log(result.result.stdout);
        }
      }

      if (this.result.value) {
        console.log(JSON.stringify(result, null, 2));
      }

      process.exit(0);
    } catch(e) {
      console.error(e);
      process.exit(-1);
    }
  }
}
