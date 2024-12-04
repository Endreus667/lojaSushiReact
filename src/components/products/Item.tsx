"use client"  // <-- Add this line to make this component a Client Component

import { Product } from "@/types/Product"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/stores/cart-store"

type Props = {
    item: Product
}

export const ProductItem = ({ item }: Props) => {
    const { toast } = useToast()
    const { upsertCartItem } = useCartStore(state => state)

    const handleAddButton = () => {
        // Add item to cart
        upsertCartItem(item, 1);  // 1 is the quantity to add

        // Show toast notification
        toast({
            title: 'Adicionado ao carrinho',
            description: item.name,
            action: <ToastAction altText="Fechar">Fechar</ToastAction>
        })
    }

    return (
        <div>
            {/* Product Image */}
            <div>
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            </div>
            
            {/* Product Details */}
            <div className="mt-3 flex flex-col gap-2">
                <p className="text-lg">{item.name}</p>
                <p className="text-sm opacity-50">R$ {item.price.toFixed(2)}</p>
                <Button variant="outline" onClick={handleAddButton}>Adicionar</Button>
            </div>
        </div>
    )
}
