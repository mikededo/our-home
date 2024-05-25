export * as Filters from './filters.svelte';

export const getEuro = (price: number) =>
  price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });
