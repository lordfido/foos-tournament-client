import moment from 'moment';

export const formatDate = (date?: Date, absolute?: boolean, format?: string) => {
  if (typeof date === 'undefined') {
    date = new Date();
  }

  if (typeof format === 'undefined') {
    format = 'MMM Do YY';
  }

  return absolute ? moment(date).format(format) : moment(date).fromNow();
};

export const getDivisionLevel = (divisionLabel: string) =>
  divisionLabel
    .replace('Division', '')
    .replace('División', '')
    .trim();
