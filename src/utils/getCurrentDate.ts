export const getCurrentDate = (): string => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${String(date.getDate()).padStart(2, "0")}`;
};
