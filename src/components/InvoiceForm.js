import { useState, useEffect } from "react";
import "@/styles/InvoiceForm.css";
import { TextField } from "@mui/material";
import PriceFormatInput from "@/tools/PriceFormatInput";
import CustomDatePicker from "@/tools/CustomDatePicker";

export default function InvoiceForm({ setShowFormDialog, setTableRows }) {
  const [jobStartDate, setJobStartDate] = useState(null);
  const [jobEndDate, setJobEndDate] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const handleJobStartDate = (newDate) => {
    setJobStartDate(newDate);
  };

  const handleJobEndDate = (newDate) => {
    setJobEndDate(newDate);
  };

  const handleJobDescription = (e) => {
    setJobDescription(e.target.value);
  };

  const handleHoursWorked = (e) => {
    setHoursWorked(e.target.value);
  };

  const handleHourlyRatePrice = (values) => {
    setHourlyRate(values.value);
  };

  const resetInputs = () => {
    setJobStartDate(null);
    setJobEndDate(null);
    setJobDescription("");
    setHoursWorked("");
    setHourlyRate("");
    setTotalAmount(0);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    setTableRows((prev) => {
      const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      const hours = parseFloat(hoursWorked) || 0;
      const rate = parseFloat(hourlyRate) || 0;
      const jobTotal = hours * rate;
      const jobRow = {
        id: nextId,
        startDate: jobStartDate,
        endDate: jobEndDate,
        description: jobDescription,
        hours: hoursWorked,
        rate: hourlyRate,
        total: jobTotal,
      };

      return [...prev, jobRow];
    });
    resetInputs();
    setShowFormDialog(false);
  };

  const handleDisabled = () => {
    const allFilled =
      jobStartDate !== null &&
      jobEndDate !== null &&
      jobDescription !== "" &&
      hoursWorked !== "" &&
      hourlyRate !== "";

    setDisabled(!allFilled);
  };

  useEffect(() => {
    handleDisabled();
  }, [jobStartDate, jobEndDate, jobDescription, hoursWorked, hourlyRate]);

  return (
    <form onSubmit={handleCreateJob}>
      <div className="invoice-inputs-main-container">
        <div className="d-flex gap-3">
          <div className="invoice-inputs-small">
            <CustomDatePicker
              label="Start Date"
              value={jobStartDate}
              handleChange={handleJobStartDate}
            />
          </div>
          <div className="invoice-inputs-small">
            <CustomDatePicker
              label="End Date"
              value={jobEndDate}
              handleChange={handleJobEndDate}
            />
          </div>
        </div>
        <div className="d-flex w-100 gap-3">
          <div className="invoice-inputs-ex-small">
            <TextField
              label="Hours"
              className="invoice-hours-worked"
              type="number"
              value={hoursWorked}
              onInput={handleHoursWorked}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>
          <div>
            <PriceFormatInput
              label="Rate"
              value={hourlyRate}
              handleValueChange={handleHourlyRatePrice}
            />
          </div>
        </div>
        <div className="align-self-stretch">
          <TextField
            label="Job Description"
            className="invoice-job-description"
            value={jobDescription}
            onInput={handleJobDescription}
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
        <button
          disabled={disabled}
          type="submit"
          className="btn btn-ameripro-blue align-self-stretch"
        >
          Add Job
        </button>
      </div>
    </form>
  );
}
