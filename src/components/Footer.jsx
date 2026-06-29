import { ASSETS } from '../constants/assets';

const socialLinks = [
  { href: '#', label: 'Instagram', icon: ASSETS.instagram },
  { href: '#', label: 'Facebook', icon: ASSETS.facebook },
  { href: '#', label: 'X', icon: ASSETS.twitter },
];

export default function Footer() {
  return (
    <footer className="bg-keeper-green text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
        <img
          src={ASSETS.logoXl}
          alt="KeenKeeper"
          className="mx-auto h-12 sm:h-14"
        />
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>

        <p className="mt-8 text-sm font-medium text-white">Social Links</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-transform hover:scale-105"
            >
              <img src={icon} alt={label} className="h-10 w-10" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-white/80">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white/80">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-white/80">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
