import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subtitle: string;
}

/**
 * Standardised title + subtitle block shared by all three auth forms,
 * so every form has identical typographic hierarchy and spacing.
 */
export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mt: 0.75 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}
