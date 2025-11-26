import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function CustomDatePicker({ label, value, handleChange, size = "small" }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={handleChange}
        format='DD-MMM-YY'
        slotProps={{
            textField: {
                size: size,
                fullWidth: true,
            },
        }}
      />
    </LocalizationProvider>
  );
}
