export const currencyFormat = (value: number) => {
  // return new Intl.NumberFormat('es-AR', {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    // currency: 'ARS',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}