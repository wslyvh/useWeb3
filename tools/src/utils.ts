const dateFns = require("date-fns");
const { startOfToday, startOfYesterday, sub } = dateFns;

const getDateFromDistance = (distance) => {
  const sanitizedDistance = distance.match(/POSTED (.*)/)[1].toLowerCase();

  if (sanitizedDistance === "today") {
    return startOfToday();
  }
  if (sanitizedDistance === "yesterday") {
    return startOfYesterday();
  }

  let [, amount, unit] = sanitizedDistance.match(/([0-9]+) ([a-z]+)/);

  if (unit[unit.length - 1] !== "s") unit = `${unit}s`;

  // Angellist only has today / yesterday / x days/weeks/months ago
  const result = sub(Date.now(), {
    [unit]: amount,
  });
  return result;
};

export const getCompensationDetails = (salary: string) => {
  const salaryMatch = salary.match(
    /^(?<currency>\$|£|€)(?<min>[0-9]+k)(\s–\s(\$|£|€)(?<max>[0-9]+k)).*$/
  );
  const equityMatch = salary.match(
    /(?<equityFrom>[0-9]\.[0-9]+%)\s–\s(?<equityTo>[0-9]\.[0-9]+\%)/
  );

  const { currency = "", min = "", max = "" } = salaryMatch?.groups ?? {};
  const { equityFrom = "", equityTo = "" } = equityMatch?.groups ?? {};

  return {
    min,
    max,
    currency,
    equity: Boolean(equityFrom || equityTo),
  };
};

export { getDateFromDistance };
