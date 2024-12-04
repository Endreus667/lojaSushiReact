import { useCheckoutStore } from "@/stores/checkout-store";
import { Button } from "../ui/button";
import Link from "next/link";
import { generateMessage } from "@/lib/generate-message";

export const StepFinish = () => {
    const { name } = useCheckoutStore(state => state);

    const message = generateMessage();
    // Corrigindo a URL para o WhatsApp
    const linkzap = `https://wa.me/${process.env.NEXT_PUBLIC_ZAP}?text=${encodeURIComponent(message)}`;

    return (
        <div className="text-center flex flex-col gap-5">
            <p>Perfeito <strong>{name}</strong>!</p>
            <p>Agora envie seu pedido ao nosso Whatsapp para concluir. Nosso atendente irá te guiar sobre seu pedido!</p>
            {/* Corrigindo a estrutura do link com Button */}
            <a href={linkzap} target="_blank" rel="noopener noreferrer">
                <Button>Enviar para o Whatsapp</Button>
            </a>
        </div>
    );
}
