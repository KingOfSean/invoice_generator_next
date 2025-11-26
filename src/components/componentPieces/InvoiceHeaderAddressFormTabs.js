import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useAppStateVariables } from "@/context/AppStateVariablesContext";
import InvoiceDateNameForm from "@/components/componentPieces/InvoiceDateNameForm";
import UserAddressForm from "@/components/componentPieces/UserAddressForm";
import BillToAddressForm from "@/components/componentPieces/BillToAddressForm";

export default function InvoiceHeaderAddressFormTabs({ setHeaderAddressDialog }) {
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

  const [tab, setTab] = useState("main-info");

  const handleTabChange = (_event, newValue) => {
    setTab(newValue);
  };

  const isDisabled =
    invoiceName === "" ||
    invoiceDate === null ||
    usersHeaderName === "" ||
    usersAddressStreet === "" ||
    usersAddressCity === "" ||
    usersAddressState === "" ||
    usersAddressZip === "" ||
    billToHeaderName === "" ||
    billToAddressStreet === "" ||
    billToAddressCity === "" ||
    billToAddressState === "" ||
    billToAddressZip === "";

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs variant="fullWidth" value={tab} onChange={handleTabChange} centered>
        <Tab label="Main Info" value="main-info" />
        <Tab label="Your Info" value="user-info" />
        <Tab label="Billing Info" value="bill-info" />
      </Tabs>

      {/* TAB 1 */}
      <div
        className="mt-3"
        style={{ display: tab === "main-info" ? "flex" : "none" }}
      >
        <InvoiceDateNameForm
          invoiceName={invoiceName}
          setInvoiceName={setInvoiceName}
          invoiceDate={invoiceDate}
          setInvoiceDate={setInvoiceDate}
        />
      </div>

      {/* TAB 2 */}
      <div
        className="mt-3"
        style={{ display: tab === "user-info" ? "flex" : "none" }}
      >
        <UserAddressForm
          usersHeaderName={usersHeaderName}
          setUserHeaderName={setUserHeaderName}
          usersAddressStreet={usersAddressStreet}
          setUsersAddressStreet={setUsersAddressStreet}
          usersAddressStreet2={usersAddressStreet2}
          setUsersAddressStreet2={setUsersAddressStreet2}
          usersAddressCity={usersAddressCity}
          setUsersAddressCity={setUsersAddressCity}
          usersAddressState={usersAddressState}
          setUsersAddressState={setUsersAddressState}
          usersAddressZip={usersAddressZip}
          setUsersAddressZip={setUsersAddressZip}
        />
      </div>

      {/* TAB 3 */}
      <div
        className="mt-3"
        style={{ display: tab === "bill-info" ? "flex" : "none" }}
      >
        <BillToAddressForm
          billToHeaderName={billToHeaderName}
          setBillToHeaderName={setBillToHeaderName}
          billToAddressStreet={billToAddressStreet}
          setBillToAddressStreet={setBillToAddressStreet}
          billToAddressStreet2={billToAddressStreet2}
          setBillToAddressStreet2={setBillToAddressStreet2}
          billToAddressCity={billToAddressCity}
          setBillToAddressCity={setBillToAddressCity}
          billToAddressState={billToAddressState}
          setBillToAddressState={setBillToAddressState}
          billToAddressZip={billToAddressZip}
          setBillToAddressZip={setBillToAddressZip}
        />
      </div>

      <div className="d-flex w-100 mt-4">
        <button
          disabled={isDisabled}
          className="btn btn-ameripro-blue flex-fill"
          onClick={() => setHeaderAddressDialog(false)}
        >
          Done
        </button>
      </div>
    </Box>
  );
}
