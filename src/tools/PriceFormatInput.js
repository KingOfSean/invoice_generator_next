import React, {useState, useEffect} from "react";
import { TextField, InputAdornment } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function PriceFormatInput({label, value, handleValueChange, size = "small", readOnly = false})
{
    return (
        <NumericFormat
            customInput={TextField}
            label={label ? label : null}
            placeholder={label ? `Enter ${label}` : null}
            value={value}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            prefix="$"
            onValueChange={(values, sourceInfo) => {
                if (!readOnly) handleValueChange(values, sourceInfo);  // 👈 block edits
            }}
            // InputProps={{
            //     startAdornment: <InputAdornment position="start">$</InputAdornment>,
            //     // className: "form-control",
            // }}
            slotProps={{ input: { readOnly: readOnly } }}
            size={size}
        />
    )
}