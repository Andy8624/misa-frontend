export const customRound = (num: number): number => {
  const integerPart = Math.floor(num);
  const decimalPart = num - integerPart;
  if (decimalPart >= 0.5) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
};
