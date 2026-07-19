import { Box, type BoxProps } from '@mui/material';

/**
 * The "glassy" card - semi-transparent background + blur, so the
 * colorful gradient behind it shows through softly.
 * Reused by the Login/Register/Forgot card in AuthPage.
 */
export default function GlassPanel({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      sx={{
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Safari needs the prefixed version too
        border: '1px solid rgba(255, 255, 255, 0.25)',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
