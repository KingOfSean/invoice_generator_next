import { useState, useEffect } from "react";
import "@/styles/InvoiceHeaderForm.css";

import { useAppStateVariables } from "@/context/AppStateVariablesContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CustomDialog from "@/tools/CustomDialog";
import InvoiceHeaderAddressFormTabs from "@/components/componentPieces/InvoiceHeaderAddressFormTabs";
import InvoiceHeaderDateNameTable from "@/components/componentPieces/InvoiceHeaderDateNameTable";

export default function InvoiceHeaderForm({ handleSubmit }) {
  const {
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

  const [headerAddressDialog, setHeaderAddressDialog] = useState(false);

  const handleCardContent = () => {
    const allFilled =
      invoiceName !== "" &&
      invoiceDate !== null &&
      usersHeaderName !== "" &&
      usersAddressStreet !== "" &&
      usersAddressCity !== "" &&
      usersAddressState !== "" &&
      usersAddressZip !== "" &&
      billToHeaderName !== "" &&
      billToAddressStreet !== "" &&
      billToAddressCity !== "" &&
      billToAddressState !== "" &&
      billToAddressZip !== "";

    return allFilled;
  };

  useEffect(() => {
    console.log("InvoiceHeaderForm mounted");
  }, []);

  return (
    <div className="px-2 px-sm-5">
      <div className="d-flex flex-column gap-3">
        <Card>
          <CardContent>
            {handleCardContent() ? (
              <div className="invoice-address-card">
                <div className="invoice-address-container">
                  <span className="invoice-address-header">{usersHeaderName}</span>
                  <span className="invoice-address-top-line">
                    {`${usersAddressStreet} ${usersAddressStreet2}`}
                  </span>
                  <span className="invoice-address-bottom-line">
                    {`${usersAddressCity}, ${usersAddressState} ${usersAddressZip}`}
                  </span>
                </div>
                <div className="invoice-address-container">
                  <span className="invoice-address-header">Bill To:</span>
                  <span className="invoice-address-name">{billToHeaderName}</span>
                  <span className="invoice-address-top-line">
                    {`${billToAddressStreet} ${billToAddressStreet2}`}
                  </span>
                  <span className="invoice-address-bottom-line">
                    {`${billToAddressCity}, ${billToAddressState} ${billToAddressZip}`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="centered-flex-row">
                <span className="invoice-card-default-text">
                  No header content to display
                </span>
              </div>
            )}
          </CardContent>
        </Card>
        <InvoiceHeaderDateNameTable
          invoiceName={invoiceName}
          invoiceDate={invoiceDate}
        />
      </div>

      <button
        className="btn btn-ameripro-red mt-3"
        onClick={() => setHeaderAddressDialog(true)}
      >
        Add/Edit Header Details
      </button>

      <CustomDialog
        showDialog={headerAddressDialog}
        handleClose={() => setHeaderAddressDialog(false)}
        title="Header Address Details"
        content={
          <InvoiceHeaderAddressFormTabs
            setHeaderAddressDialog={setHeaderAddressDialog}
          />
        }
      />
    </div>
  );
}
