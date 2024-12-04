import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";

export const generateMessage = () => {
  const { name, address } = useCheckoutStore(state => state);
  const { cart } = useCartStore(state => state);

  // Gerando a lista de produtos do pedido
  let orderProducts = [];
  for (let item of cart) {
    orderProducts.push(`${item.quantity}x ${item.product.name}`);
  }

  // Garantir que o complemento seja exibido corretamente (caso não exista)
  const complement = address.complement ? `, ${address.complement}` : "";

  // Retornar a mensagem formatada
  return `**Dados do Cliente:**
Nome: ${name}
Endereço: ${address.street}, ${address.number}${complement}
${address.district}, ${address.city}/${address.state}
------
**Pedido:**
${orderProducts.join("\n")}`;
};
