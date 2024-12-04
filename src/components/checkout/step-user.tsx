import { CheckoutSteps } from "@/stores/checkouts-steps";
import { Dispatch, SetStateAction } from "react";
import { Form, useForm, FormProvider } from "react-hook-form"; // Importando FormProvider
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useCheckoutStore } from "@/stores/checkout-store";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(2, 'preencha seu nome')
});

type Props = {
    setStep: Dispatch<SetStateAction<CheckoutSteps>>;
}

export const StepUser = ({ setStep }: Props) => {
    const { name, setName } = useCheckoutStore(state => state);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setName(values.name);
        setStep("address");
    }

    return (
        <FormProvider {...form}> {/* Envolvendo o formulário com FormProvider */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>Seu nome</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Qual seu nome?"
                                    {...field} // Passando o necessário para o input
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" variant="outline">Próximo</Button>
            </form>
        </FormProvider>
    )
}
