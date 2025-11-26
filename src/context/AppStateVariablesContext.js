"use client";
import { createContext, useContext, useState } from "react";

const AppStateVariablesContext = createContext();

export function useAppStateVariables() {
    return useContext(AppStateVariablesContext)
}

export function AppStateVariablesProvider({ children }) {
    const [tableRows, setTableRows] = useState([]);
    const [invoiceName, setInvoiceName] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(null);
    const [usersHeaderName, setUserHeaderName] = useState('');
    const [usersAddressStreet, setUsersAddressStreet] = useState('');
    const [usersAddressStreet2, setUsersAddressStreet2] = useState('');
    const [usersAddressCity, setUsersAddressCity] = useState('');
    const [usersAddressState, setUsersAddressState] = useState('');
    const [usersAddressZip, setUsersAddressZip] = useState('');
    const [billToHeaderName, setBillToHeaderName] = useState('');
    const [billToAddressStreet, setBillToAddressStreet] = useState('');
    const [billToAddressStreet2, setBillToAddressStreet2] = useState('');
    const [billToAddressCity, setBillToAddressCity] = useState('');
    const [billToAddressState, setBillToAddressState] = useState('');
    const [billToAddressZip, setBillToAddressZip] = useState('');
    const [paymentTermsText, setPaymentTermsText] = useState('Payment due within 14 days from invoice date.');
    const [paymentMethodsText, setPaymentMethodsText] = useState('Check or ACH. If mailing, please remit payment to the address listed above. For ACH please reachout for account details.');

    return (
        <AppStateVariablesContext.Provider value={{ 
            tableRowsContext: [tableRows, setTableRows],
            invoiceNameContext: [invoiceName, setInvoiceName],
            invoiceDateContext: [invoiceDate, setInvoiceDate],
            usersHeaderNameContext: [usersHeaderName, setUserHeaderName],
            usersAddressStreetContext: [usersAddressStreet, setUsersAddressStreet],
            usersAddressStreet2Context: [usersAddressStreet2, setUsersAddressStreet2],
            usersAddressCityContext: [usersAddressCity, setUsersAddressCity],
            usersAddressStateContext: [usersAddressState, setUsersAddressState],
            usersAddressZipContext: [usersAddressZip, setUsersAddressZip],
            billToHeaderNameContext: [billToHeaderName, setBillToHeaderName],
            billToAddressStreetContext: [billToAddressStreet, setBillToAddressStreet],
            billToAddressStreet2Context: [billToAddressStreet2, setBillToAddressStreet2],
            billToAddressCityContext: [billToAddressCity, setBillToAddressCity],
            billToAddressStateContext: [billToAddressState, setBillToAddressState],
            billToAddressZipContext: [billToAddressZip, setBillToAddressZip],
            paymentTermsTextContext: [paymentTermsText, setPaymentTermsText],
            paymentMethodsTextContext: [paymentMethodsText, setPaymentMethodsText],
         }}>
            {children}
         </AppStateVariablesContext.Provider>
    )
}