import React, { useState, useEffect } from 'react';
import { useAppStateVariables } from '@/context/AppStateVariablesContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function InvoiceFooterForm() {
    const {
        paymentTermsTextContext,
        paymentMethodsTextContext,
    } = useAppStateVariables();

    const [paymentTermsText, setPaymentTermsText] = paymentTermsTextContext;
    const [paymentMethodsText, setPaymentMethodsText] = paymentMethodsTextContext;

    useEffect(() => {
        console.log('InvoiceFooterForm mounted');
        // your effect logic here
    }, []);

    return (
        <div className='px-2 px-sm-5 mb-5'>
            <Card>
                <CardContent>
                    <div className='d-flex flex-column gap-3'>
                        <div className='payment-terms-container d-flex flex-column'>
                            <span style={{ fontSize: '1.1rem' }} className='fw-bold'>Payment Terms:</span>
                            <span style={{ fontSize: '0.9rem' }}>{paymentTermsText}</span>
                        </div>
                        <div className='payment-methods-container d-flex flex-column'>
                            <span style={{ fontSize: '1.1rem' }} className='fw-bold'>Payment Methods Accepted:</span>
                            <span style={{ fontSize: '0.9rem' }}>{paymentMethodsText}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}