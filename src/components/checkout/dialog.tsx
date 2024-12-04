"use client"

import { Progress } from "@/components/ui/progress"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { useState } from "react";
import { StepUser } from "@/components/checkout/step-user";
import { StepFinish } from "@/components/checkout/step-finish";
import { StepAddess } from "@/components/checkout/step-address";
import { CheckoutSteps } from "@/stores/checkouts-steps";




type Props = {
    open: boolean;
    onOpenChange: (open:boolean) => void;
}

export const CheckoutDialog = ({open, onOpenChange}: Props) => {
    const [step, setStep] = useState<CheckoutSteps>('user');
   
    let progressPct = 0;
    switch(step) {
        case 'user': progressPct = 30;
        break;
        case 'address': progressPct = 70;
        break;
        case 'finish': progressPct = 100;
        break;
    }

    return (
       <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {step === 'user' && 'dados pessoais'}
                        {step === 'address' && 'endereço de entrega'}
                        {step === 'finish' && 'envio para o whatsapp'}
                    </DialogTitle>
                </DialogHeader>

                <Progress value={progressPct}/>

                <div className="flex flex-col gap-3">
                    {step == 'user' && <StepUser setStep={setStep} />}
                    {step == 'address' && <StepAddess setStep={setStep} />}
                    {step == 'finish' && <StepFinish />}
                </div>

             
            </DialogContent>
       </Dialog>
    )
}