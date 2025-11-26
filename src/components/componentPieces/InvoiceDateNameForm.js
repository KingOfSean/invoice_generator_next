import { TextField, Box } from "@mui/material";
import CustomDatePicker from '@/tools/CustomDatePicker';

export default function InvoiceDateNameForm({ invoiceName, setInvoiceName, invoiceDate, setInvoiceDate }) {
    const handleInvoiceDate = (newDate) => {
        setInvoiceDate(newDate)
    }

  return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: '100%'}}>
            <div className='flex-fill'>
                <TextField
                    label="Invoice Number"
                    size="small"
                    fullWidth
                    value={invoiceName}
                    onChange={(e) => setInvoiceName(e.target.value)}
                />
            </div>
    
            <div className='flex-fill'>
                <CustomDatePicker
                    label="Invoice Date"
                    value={invoiceDate}
                    handleChange={handleInvoiceDate}
                />
            </div>
        </Box>
    );
}