import moment from "moment";

export const dateFormater = (date: string): string => {
  return moment(date).format("MMM Do YY").toString();
};
