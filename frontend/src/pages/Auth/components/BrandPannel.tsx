/**
 * ============================================
 * 📄 WHAT : The "story" left side of the auth screen — pure branding.
 * 🎯 WHY  : Presentational only — no state, no Redux, no props needed.
 *           All styling lives in BrandPanel.scss (one component = one .scss).
 * 🔁 FLOW : AuthPage.tsx ➜ THIS FILE
 * ============================================
 */
import { Typography } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import './BrandPanel.scss';

const features = [
  'Track your data, branches and team in one place',
  'Clean, responsive dashboard on every device',
  'Secure authentication out of the box',
];

export default function BrandPanel() {
  return (
    <div className="brand-panel">
      <div className="brand-panel__logo-row">
        <span className="brand-panel__logo">
          <RocketLaunchIcon />
        </span>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
          EMC
        </Typography>
      </div>

      <Typography variant="h2" className="brand-panel__headline">
        Build faster.
        <br />
        Ship smarter.
      </Typography>

      <Typography variant="body1" className="brand-panel__tagline">
        Manage everything from a single, clean dashboard — your data, your branches and your team,
        all in one place.
      </Typography>

      <div>
        {features.map((text) => (
          <div key={text} className="brand-panel__feature">
            <CheckCircleRoundedIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2">{text}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
