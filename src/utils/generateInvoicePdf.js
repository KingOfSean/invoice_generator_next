import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Money formatter → $X,XXX.XX
const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);

// Date formatter → "DD-MMM-YY"
const formatDDMMMYY = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  const mon = monthNames[d.getMonth()];
  const yr = String(d.getFullYear()).slice(-2);
  return `${day}-${mon}-${yr}`;
};

// Accepts number | string | Date | dayjs-like | already formatted
const formatJobDate = (value) => {
  if (!value) return "";

  if (typeof value === "number") {
    return formatDDMMMYY(value);
  }

  if (typeof value === "string" && /^\d+$/.test(value)) {
    return formatDDMMMYY(Number(value));
  }

  if (value instanceof Date) {
    return formatDDMMMYY(value);
  }

  if (value && typeof value.toDate === "function") {
    return formatDDMMMYY(value.toDate());
  }

  // assume already a nice string
  return value;
};

/**
 * generateInvoicePdf
 *
 * @param {Object} args
 * @param {Object} args.from
 * @param {string} args.from.name
 * @param {string[]} args.from.lines
 *
 * @param {Object} args.billTo
 * @param {string} args.billTo.name
 * @param {string[]} args.billTo.lines
 *
 * @param {string} args.invoiceNumber
 * @param {string} args.invoiceDate  // already formatted like "26-Nov-25"
 *
 * @param {Array}  args.jobs         // [{ description, startDate, endDate, hours, rate, amount }]
 * @param {string} args.paymentTermsTitle
 * @param {string[]} args.paymentTermsLines
 * @param {string} args.paymentMethodsTitle
 * @param {string[]} args.paymentMethodsLines
 */
export function generateInvoicePdf({
  from,
  billTo,
  invoiceNumber,
  invoiceDate,
  jobs,
  paymentTermsTitle,
  paymentTermsLines,
  paymentMethodsTitle,
  paymentMethodsLines,
}) {
  const doc = new jsPDF("p", "pt", "letter"); // 612 x 792
  const pageWidth = doc.internal.pageSize.getWidth();

  /* --------------------------------------------------------
   * TITLE — "INVOICE" (top center)
   * -------------------------------------------------------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("INVOICE", pageWidth / 2, 48, { align: "center" });

  /* --------------------------------------------------------
   * FROM (your info, left block)
   * -------------------------------------------------------- */
  let y = 80;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(from.name, 40, y);

  y += 16;
  doc.setFont("helvetica", "normal");
  from.lines.forEach((line) => {
    doc.text(line, 40, y);
    y += 14;
  });

  /* --------------------------------------------------------
   * BILL TO (right block)
   * -------------------------------------------------------- */
  let billX = pageWidth - 260;
  let billY = 80;

  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", billX, billY);

  doc.setFont("helvetica", "normal");
  billY += 16;
  doc.text(billTo.name, billX, billY);

  billY += 16;
  billTo.lines.forEach((line) => {
    doc.text(line, billX, billY);
    billY += 14;
  });

  /* --------------------------------------------------------
   * INVOICE NUMBER / DATE TABLE (2x2 with dividers)
   * -------------------------------------------------------- */
  const infoBody = [
    [
      { content: "Invoice Number", styles: { fontStyle: "bold" } },
      { content: invoiceNumber || "", styles: { halign: "right" } },
    ],
    [
      { content: "Invoice Date", styles: { fontStyle: "bold" } },
      { content: invoiceDate || "", styles: { halign: "right" } },
    ],
  ];

  autoTable(doc, {
    startY: billY + 20,          // just under Bill To block
    body: infoBody,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 6,
      lineColor: [200, 200, 200],
      lineWidth: 0.75,
      valign: "middle",
    },
    columnStyles: {
        0: { cellWidth: 130,  fillColor: [248, 248, 248], textColor: 0, },     // label col
        1: { cellWidth: 100 },     // value col
    },
    tableWidth: 230,
    margin: { left: pageWidth - 260 }, // align with Bill To block
  });

  const afterInfoTableY = doc.lastAutoTable.finalY;

  /* --------------------------------------------------------
   * JOB TABLE
   * (Description • Start Date • End Date • Hours • Rate • Amount)
   * -------------------------------------------------------- */
  const tableStartY = afterInfoTableY + 30;

  const head = [
    [
      "Description of Work",
      "Start Date",
      "End Date",
      "Hours",
      "Rate",
      "Amount",
    ],
  ];

  const body = jobs.map((job) => [
    job.description || "",
    formatJobDate(job.startDate),
    formatJobDate(job.endDate),
    job.hours != null ? String(job.hours) : "",
    formatMoney(job.rate),
    formatMoney(job.amount),
  ]);

  const totalNumeric = jobs.reduce(
    (sum, job) => sum + (Number(job.amount) || 0),
    0
  );
  const totalFormatted = formatMoney(totalNumeric);

  autoTable(doc, {
    startY: tableStartY,
    head,
    body,
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 6,
      valign: "middle",
    },
    headStyles: {
      fillColor: [248, 248, 248],
      textColor: 0,
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
      fontStyle: "bold",
    },
    bodyStyles: {
      lineWidth: 0.5,
      lineColor: [225, 225, 225],
    },
    columnStyles: {
      0: { cellWidth: 170 },                // Description
      1: { cellWidth: 80, halign: "center" }, // Start Date
      2: { cellWidth: 80, halign: "center" }, // End Date
      3: { cellWidth: 50, halign: "center" }, // Hours
      4: { cellWidth: 70, halign: "right" },  // Rate
      5: { cellWidth: 80, halign: "right" },  // Amount
    },
    theme: "grid",
    foot: [
      [
        { content: "", colSpan: 4 },
        { content: "Total", styles: { fontStyle: "bold", halign: "right", fillColor: [248, 248, 248] } },
        { content: totalFormatted, styles: { fontStyle: "bold", halign: "right", fillColor: [248, 248, 248] } },
      ],
    ],
    footStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
      fontStyle: "bold",
    },
  });

  let afterTableY = doc.lastAutoTable.finalY + 30;

  /* --------------------------------------------------------
   * PAYMENT TERMS
   * -------------------------------------------------------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(paymentTermsTitle, 40, afterTableY);
  afterTableY += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  paymentTermsLines.forEach((line) => {
    doc.text(line, 40, afterTableY);
    afterTableY += 14;
  });

  afterTableY += 10;

  /* --------------------------------------------------------
   * PAYMENT METHODS
   * -------------------------------------------------------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(paymentMethodsTitle, 40, afterTableY);
  afterTableY += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  paymentMethodsLines.forEach((line) => {
    doc.text(line, 40, afterTableY);
    afterTableY += 14;
  });

  /* --------------------------------------------------------
   * SAVE
   * -------------------------------------------------------- */
  const fileName = `invoice_${invoiceNumber || "unnumbered"}.pdf`;
  doc.save(fileName);
}
