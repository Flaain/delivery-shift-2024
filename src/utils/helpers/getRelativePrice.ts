export const getRelativePrice = (
    price: number,
    locale = navigator.language,
    options = { currency: "RUB", style: "currency", maximumFractionDigits: 0 },
): string => new Intl.NumberFormat(locale, options).format(price);