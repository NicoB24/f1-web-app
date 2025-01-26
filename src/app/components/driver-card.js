import { Card, CardContent, Typography } from '@mui/material';

export default function DriverCard({ driver }) {
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
