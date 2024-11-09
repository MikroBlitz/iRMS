export const paymentMethods = [
    {
        name: 'Cash',
        icon: 'mdi:philippine-peso',
        color: 'text-green-500',
        variant: 'default',
        disabled: false,
        iconSize: 20,
        value: 0,
    },
    {
        name: 'Gcash',
        icon: 'arcticons:gcash',
        color: 'text-blue-500',
        variant: 'outline',
        disabled: false,
        iconSize: 25,
        value: 1,
    },
    {
        name: 'Bank',
        icon: 'mdi:bank-transfer',
        color: 'text-yellow-500',
        variant: 'outline',
        disabled: false,
        iconSize: 25,
        value: 2,
    },
];

export const paymentMap: any = {
    0: 'Cash',
    1: 'Gcash',
    2: 'Bank Transfer',
};
export const getPaymentMethod = (value: any) => paymentMap[value] || 'N/A';
