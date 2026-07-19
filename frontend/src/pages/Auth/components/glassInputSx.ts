// Shared TextField styling so white text/borders show up clearly
// against the dark, semi-transparent glass background.
// Imported by LoginForm, RegisterForm, and ForgotPasswordForm.
export const glassInputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  '& .MuiFormHelperText-root': { color: '#ffb4b4' },
};