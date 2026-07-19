import { Card, CardContent, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader';

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here’s an overview of your workspace."
      />
      <Card elevation={0}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Replace this with your dashboard content.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
