'use client';

import { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Alert } from '@mui/material';
import dynamic from 'next/dynamic';
import DriverCard from '@/app/components/driver-card';
import { getDriversByYear } from '@/lib/api';

const CustomDatePicker = dynamic(() => import('@/app/components/custom-date-picker'), {
  ssr: false,
});

export default function DriversView() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchDrivers() {
      try {
        setLoading(true);
        setError(null);
        const driversData = await getDriversByYear(selectedYear);
        setDrivers(driversData);
      } catch (err) {
        setError(err.message || 'Failed to fetch drivers.');
      } finally {
        setLoading(false);
      }
    }

    fetchDrivers();
  }, [selectedYear]);

  const handleYearChange = (date) => {
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
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
        Drivers by Year
      </Typography>
      <CustomDatePicker label={selectedYear} onDateChange={handleYearChange} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {drivers.map((driver) => (
          <DriverCard key={driver.driverId} driver={driver} />
        ))}
      </Box>
    </Container>
  );
}
