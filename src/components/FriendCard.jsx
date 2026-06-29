import { Link } from 'react-router-dom';
import { getStatusBadge, formatStatusLabel } from '../utils/helpers';

export default function FriendCard({ friend }) {
  return (
    <Link
      to={`/friend/${friend.id}`}
      className="group flex flex-col items-center rounded-xl border border-gray-100 bg-white px-6 py-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="h-[72px] w-[72px] rounded-full object-cover transition-transform group-hover:scale-105"
      />
      <h3 className="mt-4 text-[15px] font-bold text-gray-900">{friend.name}</h3>
      <p className="mt-1 text-xs text-gray-400">{friend.days_since_contact}d ago</p>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <span
        className={`mt-3 rounded-full px-3.5 py-1 text-[11px] font-bold ${getStatusBadge(friend.status)}`}
      >
        {formatStatusLabel(friend.status)}
      </span>
    </Link>
  );
}