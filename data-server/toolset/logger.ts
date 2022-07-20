import moment from "moment";

const formatSeconds = (ms: number) => `${ms / 1000} seconds`;
const formatTime = () => `${moment().format("HH:mm:ss")} - `;

class Logger {
  private startedAt: number = 0;
  private lastLabel: string = "";

  constructor() {}

  public start(label: string) {
    this.startedAt = Date.now();
    this.lastLabel = label;
    console.log(`\n${formatTime()}${label}`);
  }

  public finish(additionalInfo?: string) {
    console.log(
      `${formatTime()}Done in ${formatSeconds(Date.now() - this.startedAt)} ${
        additionalInfo ? `(${additionalInfo})` : ""
      }`
    );
  }
}

export const logger = new Logger();
