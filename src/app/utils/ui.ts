export const getDivisionLevel = (divisionLabel: string) =>
  divisionLabel
    .replace('Division', '')
    .replace('División', '')
    .trim();
