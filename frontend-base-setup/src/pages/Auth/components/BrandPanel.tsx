import { Box, Typography, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

/**
 * The "catchy" left side of the login page - just branding, no form fields.
 * Hidden on small screens (sx display: none below 'md') so mobile users
 * see just the glass card, full width.
 */
export default function BrandPanel() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        color: '#fff',
        px: { md: 6, lg: 10 },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
        <RocketLaunchIcon fontSize="large" />
        <Typography variant="h5" fontWeight={700}>
          My App
        </Typography>
      </Stack>

      <Typography variant="h3" fontWeight={700} sx={{ mb: 2, maxWidth: 480, lineHeight: 1.2 }}>
        Build faster. Ship smarter.
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 420, opacity: 0.85 }}>
        Manage everything in one place — track your data, your branches,
        and your team, all from a single clean dashboard.
      </Typography>
    </Box>
  );
}
