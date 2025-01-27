'use client';

import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

export default function CustomDatePicker({ label, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={`Selected year: ${label}`}
        value={selectedDate}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
        openTo="year"
        views={['year']}
      />
    </LocalizationProvider>
  );
}
