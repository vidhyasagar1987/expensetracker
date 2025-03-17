import dayjs from "dayjs";

const currentDate = new Date();
export const currentDateDayJs = dayjs().format("MMMM, YYYY");

export const month = currentDate.getMonth() + 1;
export const year = currentDate.getFullYear();
