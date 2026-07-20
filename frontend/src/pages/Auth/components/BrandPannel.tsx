/**
 * ============================================
 * 📄 WHAT : The brand side of the auth screen — pure presentation.
 * 🎯 WHY  : No state, no props. Three stacked blocks (logo / story / footnote)
 *           so the panel reads as a designed page, not a floating paragraph.
 *           All styling lives in BrandPanel.scss (one component = one .scss).
 * 🔁 FLOW : AuthPage.tsx ➜ THIS FILE
 * ============================================
 */
import { Typography } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import './BrandPanel.scss';

const features = [
  'Track your data, branches and team in one place',
  'Clean, responsive dashboard on every device',
  'Secure authentication out of the box',
];

export default function BrandPanel() {
  return (
    <aside className="brand-panel">
      {/* top: identity */}
      <div className="brand-panel__logo-row">
        <span className="brand-panel__logo">
          <RocketLaunchIcon fontSize="small" />
        </span>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
          EMC
        </Typography>
      </div>

      {/* middle: the story */}
      <div>
        <h1 className="brand-panel__headline">Build faster. Ship smarter.</h1>
        <Typography variant="body1" className="brand-panel__tagline">
          Manage everything from a single, clean dashboard — your data, your branches and your
          team, all in one place.
        </Typography>

        <div>
          {features.map((text) => (
            <div key={text} className="brand-panel__feature">
              <CheckRoundedIcon sx={{ fontSize: 18 }} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom: quiet footnote — anchors the layout */}
      <Typography variant="caption" className="brand-panel__footnote">
        © {new Date().getFullYear()} EMC. All rights reserved.
      </Typography>
    </aside>
  );
}
