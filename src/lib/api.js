export async function getDriversByYear(year) {
  const API_URL = `https://api.jolpi.ca/ergast/f1/${year}/drivers.json`;

  let allDrivers = [];
  let currentPage = 1;
  let totalPages = 1;

  try {
    while (currentPage <= totalPages) {
      const response = await fetch(`${API_URL}?offset=${(currentPage - 1) * 30}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Extract drivers from the current page
      const drivers = data.MRData.DriverTable.Drivers;
      allDrivers = [...allDrivers, ...drivers];

      totalPages = Math.ceil(data.MRData.total / 30); // According to the API, there are 30 results per page
      currentPage += 1;
    }

    return allDrivers.map((driver) => ({
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
