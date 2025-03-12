export const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount);
