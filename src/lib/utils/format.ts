export const formatNumber = (value: number, digits = 1) => {
  const fixed = value.toFixed(digits);
  return fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;
};
