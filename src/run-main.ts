import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app-module";
import {ApplicationService} from "./services/application";
import {RunCode} from "./command-lines";
import {RunAction} from "./command-lines/actions";

export async function runMain() {
  try {
    const nest = await NestFactory.create(AppModule, {logger: false});
    nest.enableShutdownHooks();
    const app = nest.get(ApplicationService);
    app.init(nest);

    const code = app.get(RunCode);
    code.addAction(app.get(RunAction));
    await code.execute(process.argv.slice(2));
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
}
