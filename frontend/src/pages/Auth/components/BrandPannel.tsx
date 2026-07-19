import { Box, Typography, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const features = [
  'Track your data, branches and team in one place',
  'Clean, responsive dashboard on every device',
  'Secure authentication out of the box',
];

/**
 * The "story" left side of the auth screen — pure branding, no form fields.
 * Hidden below 'md' so mobile users get just the glass card, full width.
 */
export default function BrandPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        color: '#fff',
        px: { md: 8, lg: 12 },
        py: 6,
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ mb: 6, alignItems: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: 44,
            height: 44,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <RocketLaunchIcon />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
          EMC
        </Typography>
      </Stack>

      <Typography
        variant="h2"
        sx={{ fontWeight: 800, mb: 2.5, maxWidth: 520, lineHeight: 1.1, letterSpacing: '-0.02em' }}
      >
        Build faster.
        <br />
        Ship smarter.
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 440, mb: 5, opacity: 0.85, lineHeight: 1.7 }}>
        Manage everything from a single, clean dashboard — your data, your
        branches and your team, all in one place.
      </Typography>

      <Stack spacing={1.75}>
        {features.map((text) => (
          <Stack key={text} direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <CheckCircleRoundedIcon sx={{ fontSize: 20, opacity: 0.9 }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {text}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
