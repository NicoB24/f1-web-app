import dayjs from 'dayjs';

export async function getDriversByDate(date) {
  let year;

  if (date !== 'current') {
    year = date ? dayjs(date).year() : dayjs().year();
  } else {
    year = 'current'
  }

  const API_URL = `https://api.jolpi.ca/ergast/f1/${year}/drivers.json`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const drivers = data.MRData.DriverTable.Drivers;

    return drivers.map((driver) => ({
      driverId: driver.driverId,
      fullName: `${driver.givenName} ${driver.familyName}`,
      nationality: driver.nationality,
      wikipedia: driver.url || 'Unknown Wiki',
    }));
  } catch (error) {
    console.error('Failed to fetch drivers from Ergast API:', error);
    throw error;
  }
}