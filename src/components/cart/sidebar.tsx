"use client"

import { RocketIcon } from "lucide-react"
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger, Sheet } from "../ui/sheet"
import { Button } from "../ui/button"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useCartStore } from "@/stores/cart-store"
import { CartItem } from "./item"
import { useState } from "react"
import { CheckoutDialog } from "../checkout/dialog"

export const CartSidebar = () => {
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const { cart } = useCartStore(state => state);

    let subtotal = 0;
    for(let item of cart) {
        subtotal += item.quantity * item.product.price;
    }

    return (
        <Sheet>
            {/* O SheetTrigger deve estar dentro do Sheet */}
            <SheetTrigger asChild>
                <Button className="relative">
                    <RocketIcon className="mr-2" />
                    <p>Carrinho</p>

                    {/* Bolinha vermelha com número de itens */}
                    {cart.length > 0 && (
                        <div className="absolute w-5 h-5 bg-red-600 rounded-full -right-2 -top-2 flex items-center justify-center text-white text-xs font-bold">
                            {cart.length} {/* Exibe o número de itens */}
                        </div>
                    )}
                </Button>
            </SheetTrigger>

            {/* O conteúdo do Sheet também fica dentro */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Carrinho</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-5 my-3">
                    {/* Conteúdo do carrinho */}
                    {cart.map(item => (
                        <CartItem key={item.product.id} item={item}/>
                    ))}
                </div>

                <Separator className="my-4" />
                <div className="flex justify-between items-center text-xs">
                    <div>Subtotal:</div>
                    <div>R$ {subtotal.toFixed(2)}</div>
                </div>
                <Separator />
                <div className="text-center">
                    <Button
                    onClick={() => setCheckoutOpen(true)} 
                    disabled={cart.length === 0}
                    >Finalizar Compra</Button>
                </div>

                <CheckoutDialog
                open={checkoutOpen}
                onOpenChange={setCheckoutOpen}
                />
            </SheetContent>
        </Sheet>
    )
}
