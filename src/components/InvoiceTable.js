import React, { useState, useEffect } from 'react';
import {useGlobalFunctions} from "@/context/GlobalFunctionsContext";

export default function InvoiceTable({ tableRows, setTableRows, setShowFormDialog, }) {
    const {
        priceFormatter,
    } = useGlobalFunctions();

    const grandTotal = tableRows.reduce(
        (sum, row) => sum + (parseFloat(row.total) || 0),
        0
    );

    useEffect(() => {
        console.log('InvoiceTable mounted');
    }, [tableRows]);

    return (
        <div className='px-2 px-sm-5'>
            <div style={{ overflowX: 'auto', width: '100%', marginBottom: '1rem'}}>
                <table className='table table-bordered table-striped table-hover align-table-text-center'>
                    <thead className="tableHead">
                        <tr>
                            <th style={{ minWidth: '220px' }}>Description of Work</th>
                            <th style={{ minWidth: '120px' }}>Start Date</th>
                            <th style={{ minWidth: '120px' }}>End Date</th>
                            <th className="wd-20">Hours</th>
                            <th className="wd-220">Rate</th>
                            <th className="wd-220">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableRows.map((row) => {
                                const formattedStartDate = row.startDate ? row.startDate.format('DD-MMM-YY') : '';
                                const formattedEndDate = row.endDate ? row.endDate.format('DD-MMM-YY') : '';
                                return(
                                    <tr key={row.id}>
                                        <td
                                            className={`ellipsis-cell ${row._expanded ? "ellipsis-expanded" : ""}`}
                                            onClick={() => {
                                                setTableRows(prev =>
                                                prev.map(r =>
                                                    r.id === row.id
                                                    ? { ...r, _expanded: !r._expanded }
                                                    : r
                                                )
                                                );
                                            }}
                                        >
                                            {row.description}
                                        </td>
                                        <td className='text-center'>{formattedStartDate}</td>
                                        <td className='text-center'>{formattedEndDate}</td>
                                        <td className='text-center'>{row.hours}</td>
                                        <td className='text-center'>{priceFormatter(row.rate)}</td>
                                        <td className='text-center'>{priceFormatter(row.total)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"></td>
                            <td className="fw-bold">Total</td>
                            <td className="fw-bold">{priceFormatter(grandTotal)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <button className='btn btn-ameripro-red' onClick={() => setShowFormDialog(true)}>Add New Job</button>
        </div>
    );
}