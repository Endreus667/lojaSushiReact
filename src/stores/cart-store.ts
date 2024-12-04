import { Cart } from "@/types/cart"
import { Product } from "@/types/Product"
import { create } from "zustand"

type States = {
  cart: Cart[]
}

type Actions = {
  upsertCartItem: (product: Product, quantity: number) => void;
}

const initialStates: States = {
  cart: []
}

export const useCartStore = create<States & Actions>()(set => ({
  ...initialStates,
  upsertCartItem: (product, quantity) => set(state => {
    // Criando uma cópia do carrinho para evitar mutação direta
    const newCart = [...state.cart]; 

    let productIndex = newCart.findIndex(item => item.product.id === product.id);

    if (productIndex < 0) {
      // Se o item não existir no carrinho, adicione-o
      newCart.push({ product, quantity: 0 });
      productIndex = newCart.findIndex(item => item.product.id === product.id);
    }

    // Atualiza a quantidade do produto
    newCart[productIndex].quantity += quantity;

    // Se a quantidade for menor ou igual a zero, remove o item do carrinho
    if (newCart[productIndex].quantity <= 0) {
      newCart.splice(productIndex, 1);  // Removendo o item do carrinho
    }

    // Retorna o novo estado com o carrinho atualizado
    return { ...state, cart: newCart }
  })
}))
