export const currencyFormat = (value: any) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(value);
};

export const qtyFormat = (number: any) => {
    return number.toLocaleString(undefined);
};
