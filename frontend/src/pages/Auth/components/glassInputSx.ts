import type { SxProps, Theme } from '@mui/material';

// Shared TextField styling so white text/borders read clearly against the
// dark, semi-transparent glass background. Imported by all three auth forms.
//
// Design goals:
//  - subtle filled background that lifts on hover/focus (depth)
//  - a RESERVED helper-text height so the form never "jumps" when an
//    error message appears/disappears (this was the main alignment issue)
//  - no jarring white Chrome autofill background
export const glassInputSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.06)',
    transition: 'background-color .2s ease, box-shadow .2s ease',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.22)' },
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.09)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
    '&.Mui-focused': { backgroundColor: 'rgba(255,255,255,0.10)' },
    '&.Mui-focused fieldset': { borderColor: '#fff', borderWidth: '1.5px' },
    '&.Mui-error fieldset': { borderColor: '#ff9d9d' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  '& .MuiInputLabel-root.Mui-error': { color: '#ff9d9d' },
  '& .MuiFormHelperText-root': {
    marginLeft: '4px',
    marginTop: '4px',
    minHeight: '1em', // reserve space -> layout stays put whether or not there's an error
    color: '#ffc9c9',
  },
  // Chrome/Safari force a white autofill background; override it to stay on-theme.
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px rgba(40,25,75,0.75) inset',
    WebkitTextFillColor: '#fff',
    caretColor: '#fff',
    borderRadius: 'inherit',
    transition: 'background-color 9999s ease-out',
  },
};

// The primary submit button on every auth form: a solid white pill that reads
// as premium against the purple gradient, with a soft lift on hover.
export const authSubmitSx: SxProps<Theme> = {
  mt: 1,
  py: 1.3,
  borderRadius: 2,
  fontWeight: 600,
  fontSize: '0.95rem',
  textTransform: 'none',
  color: '#4930a8',
  backgroundColor: '#fff',
  boxShadow: '0 6px 18px rgba(0,0,0,0.20)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.92)',
    boxShadow: '0 8px 22px rgba(0,0,0,0.28)',
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(255,255,255,0.55)',
    color: 'rgba(73,48,168,0.6)',
  },
};

// The small "Register" / "Back to Sign In" text links at the foot of each form.
export const authLinkSx: SxProps<Theme> = {
  color: '#fff',
  fontWeight: 600,
};
