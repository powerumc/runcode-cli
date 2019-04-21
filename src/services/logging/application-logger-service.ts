import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class ApplicationLoggerService extends Logger {
  debug(message: string): void {
    console.log(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  info(message: string): void {
    console.info(message);
  }

  error(message: string | Error): void {
    console.error(message);
  }

  critical(message: string): void {
    console.error(message);
  }
}
