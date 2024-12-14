import type { CartProduct, CartStore } from '~/types';

export const currencyFormat = (value: any) => {
    return new Intl.NumberFormat('en-PH', {
        currency: 'PHP',
        style: 'currency',
    }).format(value);
};

export const qtyFormat = (number: any) => number.toLocaleString(undefined);

export const printReceipt = (customerName: string) => {
    const receipt = document.getElementById('receipt');
    if (receipt) {
        const printWindow = window.open('', '_blank', 'width=600,height=800');
        if (printWindow) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const sanitizedCustomerName = customerName.replace(/\s+/g, '-');
            const fileName = `${formattedDate}-${sanitizedCustomerName}`;

            printWindow.document.open();
            printWindow.document.write(`
                <html>
                  <head>
                      <title>Receipt: ${fileName}</title>
                    <style>
                      ${Array.from(document.styleSheets)
                          .map((styleSheet) => {
                              try {
                                  return Array.from(styleSheet.cssRules)
                                      .map((rule) => rule.cssText)
                                      .join('');
                              } catch (e) {
                                  return '';
                              }
                          })
                          .join('')}
                    </style>
                  </head>
                  <body onload="window.print(); window.close();">
                    <div>${receipt.innerHTML}</div>
                  </body>
                </html>
              `);
            printWindow.document.close();
        }
    }
};

export const generateTransactionId = computed(() => {
    const dateTime = toBasicDateTime(new Date()).replace(/[^a-zA-Z0-9]/g, '');
    const transactionId = `${dateTime}`;

    return transactionId;
});

export const orderItems = (cartStore: CartStore) =>
    cartStore.cartItems?.map((product: CartProduct) => {
        return {
            price: product.price,
            product_id: product.id,
            qty: product.qty,
            total_amount: product.amount,
        };
    });

export const orderDetails = (
    orderItems: any,
    cashTendered: Ref<string | number>,
    change: Ref<number | string>,
    customerName: Ref<string>,
    paymentMethod: Ref<string | number>,
    status: Ref<string | number>,
    totalAmount: CartStore,
    transaction_number: string,
) => ({
    cash_tendered: cashTendered.value.toString(),
    change: change.value,
    customer_guest: customerName.value,
    date: new Date().toISOString(),
    order_items: { upsert: orderItems },
    payment: paymentMethod.value,
    status: status.value,
    total_amount: totalAmount,
    transaction_number: transaction_number,
});

export const itemsToReduce = (cartStore: CartStore) =>
    cartStore.cartItems?.map((product: CartProduct) => ({
        product_id: product.id,
        qty: product.qty,
    }));

export const errorOrder = (error: any) => {
    const graphQLError = error?.graphQLErrors?.[0];
    const errorMessage =
        graphQLError?.extensions?.debugMessage ||
        graphQLError?.message ||
        'An error occurred';

    toasts(`Error completing order: ${errorMessage}!`, {
        type: 'error',
    });

    console.error('Error completing order:', error);
};
