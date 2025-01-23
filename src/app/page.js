'use client';

import { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

import { getDriversByDate } from '../lib/api';

export default function Home() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('current');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchDrivers() {
      try {
        setLoading(true);
        setError(null);

        const driversData = await getDriversByDate(selectedDate);
        setDrivers(driversData);
      } catch (err) {
        setError(err.message || 'Failed to fetch drivers.');
      } finally {
        setLoading(false);
      }
    }

    fetchDrivers();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedYear(date.year());
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        F1 Statistics
      </Typography>
      <CustomDatePicker label={selectedYear} onDateChange={handleDateChange} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {drivers.map((driver) => (
          <DriverCard key={driver.driverId} driver={driver} />
        ))}
      </Box>
    </Container>
  );
}

function DriverCard({ driver }) {
  return (
    <Card sx={{ width: 400, padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {driver.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nationality: {driver.nationality}
        </Typography>
        <Typography
          component="a"
          href={driver.wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          color="primary"
          sx={{ textDecoration: 'underline', mt: 1 }}
        >
          Visit Wikipedia
        </Typography>
      </CardContent>
    </Card>
  );
}

function CustomDatePicker({ label, onDateChange }) {
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
        renderInput={(params) => (
          <TextField
            {...params}
          />
        )}
        openTo="year"
        views={['year']}
      />
    </LocalizationProvider>
  );
}
