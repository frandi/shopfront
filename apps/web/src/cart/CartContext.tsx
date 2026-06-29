import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/** Maps a product id to the quantity in the cart. */
type CartItems = Record<string, number>;

interface CartApi {
  items: CartItems;
  count: number;
  add: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems>({});

  const api = useMemo<CartApi>(
    () => ({
      items,
      count: Object.values(items).reduce((total, quantity) => total + quantity, 0),
      add: (id) => setItems((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 })),
      setQuantity: (id, quantity) =>
        setItems((current) => {
          const next = { ...current };
          if (quantity <= 0) {
            delete next[id];
          } else {
            next[id] = quantity;
          }
          return next;
        }),
      remove: (id) =>
        setItems((current) => {
          const next = { ...current };
          delete next[id];
          return next;
        }),
      clear: () => setItems({}),
    }),
    [items],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
