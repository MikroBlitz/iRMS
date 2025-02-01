import { PaymentStatus } from '~/types/codegen/graphql';

// pos
const paymentMethods = [
    {
        color: 'text-green-500',
        disabled: false,
        icon: 'mdi:philippine-peso',
        iconSize: 20,
        name: 'Cash',
        value: PaymentStatus.Cash,
        variant: 'default',
    },
    {
        color: 'text-blue-500',
        disabled: false,
        icon: 'arcticons:gcash',
        iconSize: 20,
        name: 'Gcash',
        value: PaymentStatus.Gcash,
        variant: 'outline',
    },
    {
        color: 'text-yellow-500',
        disabled: false,
        icon: 'solar:card-transfer-outline',
        iconSize: 25,
        name: 'Bank',
        value: PaymentStatus.Bank,
        variant: 'outline',
    },
];
const noImage = 'https://static.thenounproject.com/png/340719-200.png';

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

// themes
const themeOptions = [
    { id: 1, label: 'Default', value: 'default' },
    { id: 2, label: 'Azure', value: 'azure' },
    { id: 3, label: 'Bubblegum', value: 'bubblegum' },
    { id: 4, label: 'Crimson', value: 'crimson' },
    { id: 5, label: 'Coffee', value: 'coffee' },
    { id: 6, label: 'Iris', value: 'iris' },
    { id: 7, label: 'Mustard', value: 'mustard' },
];

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
    themeOptions,
    // vatSales,
    // nonVatSales,
    // zeroRatedSales,
    // totalVat,
};
