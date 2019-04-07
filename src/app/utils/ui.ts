export const getDivisionLevel = (divisionLabel: string) =>
  divisionLabel
    .replace('Division', '')
    .replace('División', '')
    .trim();

export const howManyAscending = (divisionIndex: number) => {
  if (divisionIndex === 0) {
    return 1;
  }

  return 4;
};

export const howManyDescending = (divisionIndex: number, divisionsLength: number) => {
  if (divisionIndex === divisionsLength - 1) {
    return 0;
  }

  return 4;
};
