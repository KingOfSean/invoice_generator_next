import React from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import { usStates } from "@/data/usStates";

export default function BillToAddressForm({
  billToHeaderName,
  setBillToHeaderName,
  billToAddressStreet,
  setBillToAddressStreet,
  billToAddressStreet2,
  setBillToAddressStreet2,
  billToAddressCity,
  setBillToAddressCity,
  billToAddressState,
  setBillToAddressState,
  billToAddressZip,
  setBillToAddressZip,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Client / Company Name"
        size="small"
        fullWidth
        value={billToHeaderName}
        onChange={(e) => setBillToHeaderName(e.target.value)}
      />

      <TextField
        label="Street Address"
        size="small"
        fullWidth
        value={billToAddressStreet}
        onChange={(e) => setBillToAddressStreet(e.target.value)}
      />

      <TextField
        label="Street Address 2"
        size="small"
        fullWidth
        value={billToAddressStreet2}
        onChange={(e) => setBillToAddressStreet2(e.target.value)}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="City"
          size="small"
          fullWidth
          sx={{ flex: 2, minWidth: 210 }}
          value={billToAddressCity}
          onChange={(e) => setBillToAddressCity(e.target.value)}
        />
        <TextField
          select
          label="State"
          size="small"
          sx={{ width: 85 }}
          value={billToAddressState}
          onChange={(e) => setBillToAddressState(e.target.value)}
        >
          {usStates.map((state) => (
            <MenuItem key={state.id} value={state.abbr}>
              {state.abbr}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="ZIP"
          size="small"
          sx={{ width: 120 }}
          value={billToAddressZip}
          onChange={(e) => setBillToAddressZip(e.target.value)}
        />
      </Box>
    </Box>
  );
}
