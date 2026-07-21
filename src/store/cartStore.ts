import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "Processing" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

interface CartState {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  theme: "light" | "dark";

  // Actions
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
  toggleTheme: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      orders: [
        // Pre-populate with a demo order for rich initial account page state
        {
          id: "WOXLY-3004-12345",
          date: "2026-07-15",
          status: "Delivered",
          paymentMethod: "Credit Card",
          subtotal: 129.99,
          shipping: 0,
          tax: 10.40,
          total: 140.39,
          shippingAddress: {
            fullName: "John Doe",
            email: "john@example.com",
            address: "123 Main Street",
            city: "New York",
            postalCode: "10001",
            phone: "+1 555-0199"
          },
          items: [
            {
              product: {
                id: "p1",
                slug: "nike-air-max-270",
                name: "Nike Air Max 270",
                price: 129.99,
                originalPrice: 159.99,
                rating: 4.8,
                reviewCount: 124,
                image: "/images/products/nike-air-max-270.png",
                images: ["/images/products/nike-air-max-270.png"],
                category: "Sneakers",
                description: "The Nike Air Max 270 delivers all-day comfort.",
                details: [],
                specs: [],
                reviews: [],
                inStock: true,
                stockCount: 5
              },
              quantity: 1,
              selectedSize: "10",
              selectedColor: "White"
            }
          ]
        }
      ],
      theme: "light",

      addToCart: (product, quantity, size, color) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );

          if (existingItemIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingItemIndex].quantity += quantity;
            return { cart: newCart };
          }

          return {
            cart: [...state.cart, { product, quantity, selectedSize: size, selectedColor: color }],
          };
        });
      },

      removeFromCart: (productId, size, color) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((p) => p.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      addOrder: (orderData) => {
        const orderId = `WOXLY-${Date.now().toString().slice(-4)}-${Math.floor(
          10000 + Math.random() * 90000
        )}`;
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          date: new Date().toISOString().split("T")[0],
          status: "Processing"
        };
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
        return newOrder;
      },

      toggleTheme: () => {
        set((state) => {
          const nextTheme = state.theme === "light" ? "dark" : "light";
          if (typeof document !== "undefined") {
            const root = document.documentElement;
            if (nextTheme === "dark") {
              root.classList.add("dark");
            } else {
              root.classList.remove("dark");
            }
          }
          return { theme: nextTheme };
        });
      },
    }),
    {
      name: "woxly-cart-storage",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        theme: state.theme,
      }),
    }
  )
);
