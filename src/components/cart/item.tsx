import { Cart } from "@/types/cart";
import { CartItemQuantity } from "./item-quantity";
import { useCartStore } from "@/stores/cart-store";

type Props = {
    item: Cart;
}

export const CartItem = ({item}: Props) => {


    return (
        <div className="flex items-center gap-5">
            <div className="w-16 overflow-hidden">
                <img src={item.product.image} className="w-full h-auto object-cover" alt="" />
            </div>
            <div className="flex-1">
                <p>{item.product.name}</p>
                <p>R$ {item.product.price.toFixed(2)}</p>
            </div>
            <div>
                <CartItemQuantity cartItem={item}/>
            </div>
        </div>
    )
}