import { Card, CardContent, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader';

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Configure your workspace and preferences." />
      <Card elevation={0}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Replace this with your real settings page.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
