import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set, get) => ({
            // Cart state
            cart: [],
            isLoading: false,

            // Add to cart
            addToCart: (product) => {
                set((state) => {
                    const itemId = `${product.id}-${product.variantId || 'default'}`;
                    const existingItem = state.cart.find(item => item.itemId === itemId);
                    
                    if (existingItem) {
                        return {
                            cart: state.cart.map(item =>
                                item.itemId === itemId
                                    ? { ...item, quantity: item.quantity + product.quantity }
                                    : item
                            )
                        };
                    } else {
                        return {
                            cart: [...state.cart, { ...product, itemId, addedAt: new Date().toISOString() }]
                        };
                    }
                });
            },

            // Remove from cart
            removeCart: (itemIds) => set((state) => ({
                cart: state.cart.filter((item) => !itemIds.includes(item.itemId))
            })),

            // Update quantity
            updateQuantity: (itemId, newQuantity) => set((state) => {
                if (newQuantity <= 0) {
                    return { cart: state.cart.filter(item => item.itemId !== itemId) };
                }
                return {
                    cart: state.cart.map(item =>
                        item.itemId === itemId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                };
            }),

            // Clear cart
            clearCart: () => set({ cart: [] }),

            // Move to wishlist (just removes for now)
            moveToWishlist: (itemId) => set((state) => ({
                cart: state.cart.filter(item => item.itemId !== itemId)
            })),

            // Get total items
            getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),

            // Get cart summary
            getCartSummary: () => {
                const { cart } = get();
                const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                const shipping = subtotal > 499 ? 0 : 50;
                const tax = Math.round(subtotal * 0.18);
                
                return {
                    totalItems: cart.reduce((total, item) => total + item.quantity, 0),
                    subtotal,
                    shipping,
                    tax,
                    total: subtotal + shipping + tax,
                    savings: 0
                };
            },

            // Create order
            createOrder: async (orderData) => {
                set({ isLoading: true });
                try {
                    const { cart, getCartSummary } = get();
                    const summary = getCartSummary();
                    
                    const response = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...orderData,
                            items: cart.map(item => ({
                                productId: item.id,
                                productName: item.name,
                                quantity: item.quantity,
                                price: item.price,
                                totalPrice: item.price * item.quantity
                            })),
                            summary
                        })
                    });
                    
                    if (!response.ok) throw new Error('Failed to create order');
                    
                    const result = await response.json();
                    set({ cart: [], isLoading: false });
                    return result;
                    
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;
