import { defineStore } from 'pinia';

import type { CartProduct, Product } from '~/types';

import { toasts } from '~/composables/useToast';

export const useCart = defineStore('cart', {
    state: () => ({
        cartItems: [] as CartProduct[],
    }),
    getters: {
        totalAmount(state) {
            return state.cartItems.reduce(
                (total, item: any) => total + item.amount,
                0,
            );
        },
        totalTax(state) {
            return this.totalAmount * 0.12; // TODO: 12% tax sample hard coded
        },
        promotionAmount(state) {
            return this.totalAmount * 0.1; // TODO: 10% discount sample hard coded
        },
        totalAmountWithTaxAndDiscount(state) {
            return this.totalAmount + this.totalTax - this.promotionAmount;
        },
    },
    actions: {
        addProductToCart(product: Product) {
            const itemIndex = this.cartItems.findIndex(
                (item) => item.item === product.name,
            );
            const stocks = product.inventories[0].qty; // TODO: fix dynamic stocks checker

            if (itemIndex !== -1) {
                const existingProduct: any = this.cartItems[itemIndex];

                existingProduct.qty < stocks
                    ? ((existingProduct.qty += 1),
                      (existingProduct.amount =
                          existingProduct.qty * existingProduct.price),
                      this.cartItems.splice(itemIndex, 1),
                      this.cartItems.unshift(existingProduct))
                    : toasts('Sorry, that is the maximum quantity available!', {
                          type: 'warning',
                      });
            } else {
                this.cartItems.unshift({
                    qty: 1,
                    id: product.id,
                    image: product.image,
                    item: product.name,
                    price: product.price,
                    amount: product.price,
                    stock: product.inventories[0].qty, // TODO: test only, get stock dynamically
                });

                toasts(`${product.name} added to cart!`, {
                    type: 'success',
                    position: 'top-left',
                });
            }
        },
        deleteCartItem(productToDelete: string) {
            const index = this.cartItems.findIndex(
                (item) => item.item === productToDelete,
            );
            if (index > -1) {
                this.cartItems.splice(index, 1);
                toasts('Item removed!', { type: 'success' });
            } else {
                toasts('Item not found in cart!', { type: 'warning' });
            }
        },
        reduceQuantity(product: CartProduct) {
            const cartItem: any = this.cartItems.find(
                (item) => item.item === product.item,
            );
            if (cartItem && cartItem.qty > 1) {
                cartItem.qty -= 1;
                cartItem.amount = cartItem.qty * cartItem.price;
            }
        },
        addQuantity(product: CartProduct) {
            const cartItem: any = this.cartItems.find(
                (item) => item.item === product.item,
            );
            if (cartItem) {
                cartItem.qty += 1;
                cartItem.amount = cartItem.qty * cartItem.price;
            }
        },
        updateQuantity(product: any, change: number) {
            if (
                product.qty + change >= 1 &&
                product.qty + change <= product.stock
            ) {
                product.qty += change;
                product.amount = product.qty * product.price;
            } else if (product.qty + change > product.stock) {
                toasts('Sorry, that is the maximum quantity available!', {
                    type: 'warning',
                });
            }
        },
        onQuantityInput(event: Event, product: any) {
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
        },
        clearCart() {
            this.cartItems = [];
        },
        holdOrder(name: string) {
            if (name.length > 0) {
                this.clearCart();
                toasts(`Order placed for ${name}!`, {
                    type: 'success',
                    position: 'top-center',
                    autoClose: 3000,
                });
            } else {
                toasts('Enter customer name to hold order!', {
                    type: 'warning',
                    autoClose: 3000,
                });
            }
        },
        paymentSuccess() {
            this.clearCart();
            toasts('Order completed!', {
                type: 'success',
                position: 'top-right',
                theme: 'colored',
                transition: 'bounce',
                autoClose: 3000,
            });
        },
    },
    persist: true,
});
