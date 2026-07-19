import { Typography } from '@mui/material';

// Example page. Notice it does NOT include AppBar/Sidebar/Paper —
// MainLayout already wraps every page with those automatically.
export default function Dashboard() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This content sits inside the shared Paper. Try resizing your browser
        window (or opening dev tools mobile view) to see the Sidebar switch
        to an overlay below 600px width.
      </Typography>
    </>
  );
}
