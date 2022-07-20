import moment from "moment";

enum DateTimeFormat {
  standardLong = "MM/DD/YYYY HH:mm",
}

export const makeDateTime = (dateTime: string) =>
  moment(dateTime).format(DateTimeFormat.standardLong);
