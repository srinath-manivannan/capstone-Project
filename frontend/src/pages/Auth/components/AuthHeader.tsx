/**
 * ============================================
 * 📄 WHAT : Standardised title + subtitle block shared by all 3 auth forms.
 * 🎯 WHY  : DRY — one component keeps the typography identical everywhere.
 * 🔁 FLOW : Login/Register/Forgot forms ➜ THIS FILE
 * ============================================
 */
import { Typography } from '@mui/material';
import './AuthHeader.scss';

interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <div className="auth-header">
      <Typography variant="h5" className="auth-header__title">
        {title}
      </Typography>
      <Typography variant="body2" className="auth-header__subtitle">
        {subtitle}
      </Typography>
    </div>
  );
}
