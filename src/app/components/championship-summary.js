'use client';

import { useEffect, useState } from 'react';
import {
  getLastRaceResults,
  getDriverStandings,
  getConstructorStandings,
} from '@/lib/api';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';

export default function ChampionshipSummary() {
  const [lastRace, setLastRace] = useState(null);
  const [topDrivers, setTopDrivers] = useState([]);
  const [topTeams, setTopTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const race = await getLastRaceResults();
        const drivers = await getDriverStandings();
        const teams = await getConstructorStandings();

        setLastRace(race);
        setTopDrivers(drivers.slice(0, 3));
        setTopTeams(teams.slice(0, 1));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching F1 data:', error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        F1 Championship Summary
      </Typography>

      <Grid container direction="column" spacing={3}>
        {/* Last Race */}
        {!!lastRace && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Last Race</Typography>
                <Typography variant="subtitle1">
                  {lastRace.raceName} – {lastRace.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Circuit: {lastRace.Circuit.circuitName}
                </Typography>

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Top 3 Finishers:
                </Typography>
                <ol>
                  {lastRace.Results?.slice(0, 3).map((result) => (
                    <li key={result.position}>
                      {result.Driver.givenName} {result.Driver.familyName} ({result.Constructor.name})
                    </li>
                  ))}
                </ol>

                {/* Fastest Lap */}
                {lastRace?.Results && (() => {
                  const fastest = lastRace.Results.find(
                    (r) => r.FastestLap && r.FastestLap.rank === '1'
                  );
                  return fastest ? (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Fastest Lap</Typography>
                      <Typography variant="body2">
                        {fastest.Driver.givenName} {fastest.Driver.familyName} – Lap {fastest.FastestLap.lap}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Time: {fastest.FastestLap.Time.time}
                      </Typography>
                    </Box>
                  ) : null;
                })()}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Driver Leader */}
        {topDrivers.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Championship Leader</Typography>
                <Typography variant="body1">
                  {topDrivers[0].Driver.givenName} {topDrivers[0].Driver.familyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {topDrivers[0].Constructors[0].name} – {topDrivers[0].points} pts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Constructor Leader */}
        {topTeams.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top Constructor</Typography>
                <Typography variant="body1">
                  {topTeams[0].Constructor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {topTeams[0].points} pts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
