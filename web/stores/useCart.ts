import { defineStore } from 'pinia';
import type { CartProduct, Product } from '~/types';
import { toasts } from '~/composables/useToast';

export const useCart = defineStore(
    'cart',
    () => {
        // State
        const cartItems = reactive<CartProduct[]>([]);

        // Actions
        const addProductToCart = (product: Product) => {
            const itemIndex = cartItems.findIndex(
                (item) => item.item === product.name,
            );
            const stocks = product.inventories[0].qty; // TODO: fix dynamic stocks checker

            if (itemIndex !== -1) {
                const existingProduct = cartItems[itemIndex];

                if (existingProduct?.qty && existingProduct?.price) {
                    if (existingProduct.qty < stocks) {
                        existingProduct.qty += 1;
                        existingProduct.amount =
                            existingProduct.qty * existingProduct.price;

                        cartItems.splice(itemIndex, 1);
                        cartItems.unshift(existingProduct);
                    }
                } else console.error('Existing Product is undefined');
            } else {
                cartItems.unshift({
                    amount: product.price,
                    id: product.id,
                    image: product.image,
                    item: product.name,
                    price: product.price,
                    qty: 1,
                    stock: product.inventories[0].qty, // TODO: test only, get stock dynamically
                });

                toasts(`${product.name} added to cart!`, {
                    position: 'top-left',
                    type: 'success',
                });
            }
        };
        const addQuantity = (product: CartProduct) => {
            const cartItem = cartItems.find(
                (item) => item.item === product.item,
            );
            if (cartItem?.qty && cartItem?.price) {
                cartItem.qty += 1;
                cartItem.amount = cartItem.qty * cartItem.price;
            } else console.error('Cart Item is undefined');
        };
        const clearCart = () => cartItems.splice(0, cartItems.length);
        const deleteCartItem = (productToDelete: string) => {
            const index = cartItems.findIndex(
                (item) => item.item === productToDelete,
            );
            if (index > -1) {
                cartItems.splice(index, 1);
                toasts('Item removed!', { type: 'success' });
            } else toasts('Item not found in cart!', { type: 'warning' });
        };
        const holdOrder = (name: string) => {
            if (name.length > 0) {
                clearCart();
                toasts(`Order placed for ${name}!`, {
                    autoClose: 3000,
                    position: 'top-center',
                    type: 'success',
                });
            } else
                toasts('Enter customer name to hold order!', {
                    autoClose: 3000,
                    type: 'warning',
                });
        };
        const onQuantityInput = (event: Event, product: any) => {
            const input = parseInt(
                (event.target as HTMLInputElement).value,
                10,
            );

            if (!isNaN(input) && input >= 1 && input <= product.stock) {
                product.qty = input;
                product.amount = product.qty * product.price;
            } else if (input > product.stock) {
                toasts('Sorry, that is the maximum quantity available!', {
                    type: 'warning',
                });
            } else {
                product.qty = 1;
                product.amount = product.qty * product.price;
            }
        };
        const paymentSuccess = () => {
            clearCart();
            toasts('Order completed!', {
                autoClose: 3000,
                position: 'top-right',
                theme: 'colored',
                transition: 'bounce',
                type: 'success',
            });
        };
        const reduceQuantity = (product: CartProduct) => {
            const cartItem = cartItems.find(
                (item) => item.item === product.item,
            );
            if (cartItem?.qty && cartItem?.price) {
                if (cartItem.qty > 1) {
                    cartItem.qty -= 1;
                    cartItem.amount = cartItem.qty * cartItem.price;
                }
            }
        };
        const updateQuantity = (product: any, change: number) => {
            if (
                product.qty + change >= 1 &&
                product.qty + change <= product.stock
            ) {
                product.qty += change;
                product.amount = product.qty * product.price;
            } else if (product.qty + change > product.stock)
                toasts('Sorry, that is the maximum quantity available!', {
                    type: 'warning',
                });
        };

        // Getters
        const totalAmount = computed(() => {
            return cartItems.reduce(
                (total, item: any) => total + item.amount,
                0,
            );
        });
        const promotionAmount = computed(() => {
            return totalAmount.value * 0.1; // TODO: 10% discount sample hard coded
        });
        const totalTax = computed(() => {
            return totalAmount.value * 0.12; // TODO: 12% tax sample hard coded
        });
        const totalAmountWithTaxAndDiscount = computed(() => {
            return totalAmount.value + totalTax.value - promotionAmount.value;
        });

        return {
            addProductToCart,
            addQuantity,
            cartItems,
            clearCart,
            deleteCartItem,
            holdOrder,
            onQuantityInput,
            paymentSuccess,
            promotionAmount,
            reduceQuantity,
            totalAmount,
            totalAmountWithTaxAndDiscount,
            totalTax,
            updateQuantity,
        };
    },
    {
        persist: true,
    },
);
