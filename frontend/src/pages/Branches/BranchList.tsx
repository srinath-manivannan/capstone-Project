import { Card, CardContent, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader';

export default function BranchList() {
  return (
    <>
      <PageHeader title="Branches" subtitle="Manage the branches across your organization." />
      <Card elevation={0}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Replace this with your real branch list / table.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
