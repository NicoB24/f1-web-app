const BASE_URL = 'https://api.jolpi.ca/ergast/api/f1';

export async function getDriversByYear(year) {
  const API_URL = `${BASE_URL}/${year}/drivers.json`;

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

// Fetches results of the last race
export async function getLastRaceResults() {
  const res = await fetch(`${BASE_URL}/current/last/results.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races[0];
}

// Fetches current driver standings
export async function getDriverStandings() {
  const res = await fetch(`${BASE_URL}/current/driverStandings.json`);
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

// Fetches current constructor standings
export async function getConstructorStandings() {
  const res = await fetch(`${BASE_URL}/current/constructorStandings.json`);
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
