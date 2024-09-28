import * as dayjs from "dayjs";

const showTimeFormat = (data, timeFormat) => {
  return dayjs(data).format(timeFormat);
};

const showDateFormat = (data, dateFormat) => {
  return dayjs(data).format(dateFormat);
};

const showDateTimeFormat = (data, date, time) => {
  return dayjs(data).format(`${date} ${time}`);
};

export { showTimeFormat, showDateFormat, showDateTimeFormat };
