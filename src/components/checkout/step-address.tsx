import { CheckoutSteps } from "@/stores/checkouts-steps";
import { Dispatch, SetStateAction } from "react";
import { Form, useForm, FormProvider } from "react-hook-form"; // Importando FormProvider
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useCheckoutStore } from "@/stores/checkout-store";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const formSchema = z.object({
    street: z.string().min(2, "preencha o endereço"),
    number: z.string().min(2, "preencha o número"),
    complement: z.string().optional(),
    district: z.string().min(2, "preencha o bairro"),
    city: z.string().min(2, "preencha a cidade"),
    state: z.string().min(2, "preencha o estado")
});

type Props = {
    setStep: Dispatch<SetStateAction<CheckoutSteps>>;
}

export const StepAddess = ({ setStep }: Props) => {
    const { address, setAddress } = useCheckoutStore(state => state);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...address }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAddress(values);
        setStep('finish');
    }

    return (
        <FormProvider {...form}> {/* Envolvendo o formulário com FormProvider */}
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>Rua</FormLabel>
                            <FormControl>
                                <Input
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        
                    )}
                />

<FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>número</FormLabel>
                            <FormControl>
                                <Input
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        
                    )}
                />

<FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>complemento</FormLabel>
                            <FormControl>
                                <Input
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        
                    )}
                />

<FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>bairro</FormLabel>
                            <FormControl>
                                <Input
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        
                    )}
                />

<FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>cidade</FormLabel>
                            <FormControl>
                                <Input
                                  {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        
                    )}
                />

                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => ( // Aqui, fazemos o desestruturamento diretamente de field
                        <FormItem>
                            <FormLabel>estado</FormLabel>
                            <FormControl>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="estado"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sp">São paulo</SelectItem>
                                        <SelectItem value="pr">paraná</SelectItem>
                                        <SelectItem value="rj">Rio de janeiro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        
                    )}
                />
        </div>
            <div className="flex justify-between mt-4">
                <Button variant="link" onClick={()=> setStep('user')}>Voltar</Button>
                <Button type="submit">Concluir</Button>
                </div>
            </form>
        </FormProvider>
    )
}
