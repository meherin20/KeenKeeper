import { NavLink } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

const navLinks = [
  { to: '/', label: 'Home', icon: ASSETS.home },
  { to: '/timeline', label: 'Timeline', icon: ASSETS.timeline },
  { to: '/stats', label: 'Stats', icon: ASSETS.stats },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/">
          <img src={ASSETS.logo} alt="KeenKeeper" className="h-9 sm:h-10" />
        </NavLink>

        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:gap-2 sm:text-base ${
                    isActive
                      ? 'bg-keeper-green text-white'
                      : 'text-gray-500 hover:text-gray-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className={`h-[18px] w-[18px] ${isActive ? 'brightness-0 invert' : ''}`}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

