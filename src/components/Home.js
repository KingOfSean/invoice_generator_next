"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "@/styles/Home.css";

import { useAppStateVariables } from "@/context/AppStateVariablesContext";

import InvoiceForm from "@/components/InvoiceForm";
import InvoiceTable from "@/components/InvoiceTable";
import InvoiceHeaderForm from "@/components/InvoiceHeaderForm";
import InvoiceFooterForm from "@/components/InvoiceFooterForm";

import CustomDialog from "@/tools/CustomDialog";
import CustomTitleDivider from "@/tools/CustomTitleDivider";
import { generateInvoicePdf } from "../utils/generateInvoicePdf";


export default function Home() {
    const {
        tableRowsContext,
        invoiceNameContext,
        invoiceDateContext,
        usersHeaderNameContext,
        usersAddressStreetContext,
        usersAddressStreet2Context,
        usersAddressCityContext,
        usersAddressStateContext,
        usersAddressZipContext,
        billToHeaderNameContext,
        billToAddressStreetContext,
        billToAddressStreet2Context,
        billToAddressCityContext,
        billToAddressStateContext,
        billToAddressZipContext,
    } = useAppStateVariables();

    const [tableRows, setTableRows] = tableRowsContext;
    const [invoiceName, setInvoiceName] = invoiceNameContext;
    const [invoiceDate, setInvoiceDate] = invoiceDateContext;
    const [usersHeaderName, setUserHeaderName] = usersHeaderNameContext;
    const [usersAddressStreet, setUsersAddressStreet] = usersAddressStreetContext;
    const [usersAddressStreet2, setUsersAddressStreet2] = usersAddressStreet2Context;
    const [usersAddressCity, setUsersAddressCity] = usersAddressCityContext;
    const [usersAddressState, setUsersAddressState] = usersAddressStateContext;
    const [usersAddressZip, setUsersAddressZip] = usersAddressZipContext;
    const [billToHeaderName, setBillToHeaderName] = billToHeaderNameContext;
    const [billToAddressStreet, setBillToAddressStreet] = billToAddressStreetContext;
    const [billToAddressStreet2, setBillToAddressStreet2] = billToAddressStreet2Context;
    const [billToAddressCity, setBillToAddressCity] = billToAddressCityContext;
    const [billToAddressState, setBillToAddressState] = billToAddressStateContext;
    const [billToAddressZip, setBillToAddressZip] = billToAddressZipContext;

    const [showFormDialog, setShowFormDialog] = useState(false);

    const handleFormDialog = () => {
        setShowFormDialog(false)
    }

    const handleDownloadPdf = () => {
        const from = {
        name: usersHeaderName,
        lines: [
            usersAddressStreet,
            usersAddressStreet2 || "",
            `${usersAddressCity}, ${usersAddressState} ${usersAddressZip}`,
        ].filter(Boolean),
        };

        const billTo = {
        name: billToHeaderName,
        lines: [
            billToAddressStreet,
            billToAddressStreet2 || "",
            `${billToAddressCity}, ${billToAddressState} ${billToAddressZip}`,
        ].filter(Boolean),
        };

        const jobs = tableRows.map((row) => ({
        description: row.description,
        startDate: row.startDate,
        endDate: row.endDate,
        hours: Number(row.hours) || 0,
        rate: Number(row.rate) || 0,
        amount: Number(row.total) || 0,
        }));

        generateInvoicePdf({
            from,
            billTo,
            invoiceNumber: invoiceName,
            invoiceDate:
                typeof invoiceDate?.format === "function"
                ? invoiceDate.format("DD-MMM-YY")
                : invoiceDate || "",
            jobs,
            paymentTermsTitle: "Payment Terms:",
            paymentTermsLines: [
                "Payment due within 14 days from invoice date.",
            ],
            paymentMethodsTitle: "Payment Methods Accepted:",
            paymentMethodsLines: [
                "Check or ACH. If mailing, please remit payment to the address listed above.",
                "For ACH please reach out for account details.",
            ],
        });
    };

    useEffect(() => {
        console.log('Home mounted');
        // your effect logic here
    }, []);

    return (
        <div className='px-2 px-sm-5 w-100 d-flex flex-column'>
            <div className='d-flex flex-column gap-3'>
                <CustomTitleDivider title={'Invoice Header'} titleColor={'#22356f'} fontSize={'1.7rem'} />
                <InvoiceHeaderForm />
                <CustomTitleDivider title={'Invoice Jobs'} titleColor={'#22356f'} fontSize={'1.7rem'} />
                <InvoiceTable tableRows={tableRows} setTableRows={setTableRows} setShowFormDialog={setShowFormDialog} />
                <CustomTitleDivider title={'Invoice Footer'} titleColor={'#22356f'} fontSize={'1.7rem'} />
                <InvoiceFooterForm />
                <CustomDialog showDialog={showFormDialog} handleClose={handleFormDialog} title={'Add New Job'} content={<InvoiceForm setShowFormDialog={setShowFormDialog} setTableRows={setTableRows} />}/>
            </div>
            <div className="generate-pdf-container">
                <button
                    type="button"
                    className="btn btn-ameripro-blue mt-3"
                    onClick={handleDownloadPdf}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
}