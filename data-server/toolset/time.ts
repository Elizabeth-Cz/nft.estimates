import moment from "moment";

export enum DateFormat {
  FULL = "YYYY-MM-DDTHH:mm:ss",
}

export class Time {
  constructor() {}

  static now(format: DateFormat = DateFormat.FULL): string {
    return moment().format(format);
  }

  static format(time: number, format: DateFormat = DateFormat.FULL): string {
    return moment(time).format(format);
  }
}
