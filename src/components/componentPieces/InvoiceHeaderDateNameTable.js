import React, { useState, useEffect } from 'react';
import '@/styles/InvoiceHeaderForm.css';

export default function InvoiceHeaderDateNameTable({ invoiceName, invoiceDate }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    console.log('InvoiceHeaderDateNameTable mounted');
    // your effect logic here
  }, []);

  return (
    <div className='align-self-end'>
        <table className='table table-bordered table-striped table-hover align-table-text-end'>
            <tbody>
                <tr>
                    <th scope='row' className='fw-bold'>Invoice Number</th>
                    <td className='invoice-header-table-text'>{invoiceName}</td>
                </tr>
                <tr>
                    <th scope='row' className='fw-bold'>Invoice Date</th>
                    <td className='invoice-header-table-text'>{invoiceDate ? invoiceDate.format('DD-MMM-YY') : ''}</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}