const isTheSameDay = (firstDate: Date, secondDate: Date) => firstDate.getDate() === secondDate.getDate();
const isTheSameMonth = (firstDate: Date, secondDate: Date) => firstDate.getMonth() === secondDate.getMonth();
const isTheSameYear = (firstDate: Date, secondDate: Date) => firstDate.getFullYear() === secondDate.getFullYear();

export const areTheyTheSameDate = (firstDate: Date, secondDate: Date) =>
  isTheSameDay(firstDate, secondDate) && isTheSameMonth(firstDate, secondDate) && isTheSameYear(firstDate, secondDate);
