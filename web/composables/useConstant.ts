// pos
const paymentMethods = [
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
        iconSize: 20,
        value: 1,
    },
    {
        name: 'Bank',
        icon: 'solar:card-transfer-outline',
        color: 'text-yellow-500',
        variant: 'outline',
        disabled: false,
        iconSize: 25,
        value: 2,
    },
];
const paymentMap: any = {
    0: 'Cash',
    1: 'Gcash',
    2: 'Bank Transfer',
};
const noImage = 'https://static.thenounproject.com/png/340719-200.png';
const getPaymentMethod = (value: any) => paymentMap[value] || 'N/A';
const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// receipt
const storeName = ref('Shop Name');
const storeAddress = ref('Store Address');
const vatNumber = ref('000-000-000-000');
const minNumber = ref('123456789');
const serialNumber = ref('AB98765XYZ');
const posId = ref('001');
const transactionNumber = ref('00000000001');
const website = ref('www.website.com');
// const vatSales = ref(0.0);
// const nonVatSales = ref(0.0);
// const zeroRatedSales = ref(0.0);
// const totalVat = ref(0.0);

export {
    getPaymentMethod,
    numbers,
    paymentMethods,
    storeName,
    storeAddress,
    vatNumber,
    minNumber,
    serialNumber,
    posId,
    transactionNumber,
    website,
    noImage,
    // vatSales,
    // nonVatSales,
    // zeroRatedSales,
    // totalVat,
};
