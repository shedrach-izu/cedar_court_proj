"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import api from "@/lib/api";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  cartCount: number;

  setCartOpen: (value: boolean) => void;

  addToCart: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQty: (id: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  // =========================
  // GET USER CART
  // =========================

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      console.log("========== RAW CART RESPONSE ==========");
console.log(res.data);
console.log("========== CART ITEMS ==========");
console.log(res.data.items);

      const backendItems = res.data.cart?.items ?? [];

      const formattedItems: CartItem[] = backendItems.map(
        (item: any) => ({
          id: item.menu._id,
          name: item.menu.title,
          price: item.price,
          qty: item.quantity,
          img: item.menu.image?.url ?? "",
        })
      );

      console.log("cart items:",formattedItems)

      setCartItems(formattedItems);
    } catch (error) {
      console.log("Error fetching cart:", error);
      setCartItems([]);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async (menuId: string) => {
    try {
        const res = await api.post("/cart/add", {
        menu: menuId,
        quantity: 1,
        });

        const backendItems = res.data.cart?.items ?? [];

        const formattedItems: CartItem[] = backendItems.map(
        (cartItem: any) => ({
            id: cartItem.menu._id,
            name: cartItem.menu.title,
            price: cartItem.price,
            qty: cartItem.quantity,
            img: cartItem.menu.image?.url ?? "",
        })
        );

        setCartItems(formattedItems);
    } catch (error) {
        console.log("MENU ID:", menuId);

        throw error;
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQty = async (id: string, qty: number) => {
  console.log("UPDATE CART");
  console.log("ID:", id);
  console.log("QUANTITY:", qty);

  if (!id) {
    console.error("❌ updateQty received an undefined ID");
    return;
  }

  if (qty <= 0) {
    await removeItem(id);
    return;
  }

  try {
    const res = await api.patch(`/cart/update/${id}`, {
      quantity: qty,
    });

    const backendItems = res.data.cart?.items ?? [];

    const formattedItems: CartItem[] = backendItems.map(
      (item: any) => ({
        id: item.menu._id,
        name: item.menu.title,
        price: item.price,
        qty: item.quantity,
        img: item.menu.image?.url ?? "",
      })
    );

    setCartItems(formattedItems);
  } catch (error) {
    console.log("Error updating cart:", error);
    throw error;
  }
};

//   const updateQty = async (id: string, qty: number) => {
//     if (qty <= 0) {
//       await removeItem(id);
//       return;
//     }

//     try {
//       const res = await api.patch(`/cart/update/${id}`, {
//         quantity: qty,
//       });

//       const backendItems = res.data.cart?.items ?? [];

//       const formattedItems: CartItem[] = backendItems.map(
//         (item: any) => ({
//           id: item.menu._id,
//           name: item.menu.title,
//           price: item.price,
//           qty: item.quantity,
//           img: item.menu.image?.url ?? "",
//         })
//       );

//       setCartItems(formattedItems);
//     } catch (error) {
//       console.log("Error updating cart:", error);
//       throw error;
//     }
//   };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (id: string) => {
    try {
        console.log("REMOVE ID:", id);
      const res = await api.delete(`/cart/remove/${id}`);

      const backendItems = res.data.cart?.items ?? [];

      const formattedItems: CartItem[] = backendItems.map(
        (item: any) => ({
          id: item.menu._id,
          name: item.menu.title,
          price: item.price,
          qty: item.quantity,
          img: item.menu.image?.url ?? "",
        })
      );

      setCartItems(formattedItems);
    } catch (error) {
      console.log("REMOVE ERROR:", error);
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  throw error;
    }
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");

      setCartItems([]);
    } catch (error) {
      console.log("Error clearing cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        cartCount,
        setCartOpen,
        addToCart,
        removeItem,
        updateQty,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}