import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFriends } from '../context/FriendsContext';
import { CHECK_IN_ICONS } from '../constants/assets';
import { addTimelineEntry, getStatusBadge, formatStatusLabel, formatDate } from '../utils/helpers';

const checkInButtons = [
  { type: 'Call' },
  { type: 'Text' },
  { type: 'Video' },
];

export default function FriendDetail() {
  const { id } = useParams();
  const { getFriendById } = useFriends();
  const friend = getFriendById(id);

  if (!friend) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-page-bg px-4">
        <h2 className="text-2xl font-bold text-gray-900">Friend not found</h2>
        <Link to="/" className="text-keeper-green hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleCheckIn = (type) => {
    addTimelineEntry({
      friendId: friend.id,
      friendName: friend.name,
      type: type.toLowerCase(),
      title: `${type} with ${friend.name}`,
    });
    toast.success(`${type} logged with ${friend.name}!`);
  };

  return (
    <div className="bg-page-bg">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="mb-8 inline-block text-sm text-gray-500 transition-colors hover:text-gray-800"
        >
          &larr; Back to Friends
        </Link>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-8 text-center shadow-sm">
              <img
                src={friend.picture}
                alt={friend.name}
                className="mx-auto h-28 w-28 rounded-full object-cover"
              />
              <h1 className="mt-5 text-xl font-bold text-gray-900">{friend.name}</h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusBadge(friend.status)}`}
                >
                  {formatStatusLabel(friend.status)}
                </span>
                {friend.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-keeper-green-pale px-3 py-1 text-xs font-semibold uppercase tracking-wide text-keeper-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm italic text-gray-500">&ldquo;{friend.bio}&rdquo;</p>
              <p className="mt-4 text-xs text-gray-400">Preferred: email</p>
            </div>

            <button className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
              Snooze 2 Weeks
            </button>
            <button className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
              Archive
            </button>
            <button className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm font-medium text-red-500 shadow-sm transition-colors hover:bg-red-50">
              Delete
            </button>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-900">{friend.days_since_contact}</p>
                <p className="mt-2 text-sm text-gray-500">Days Since Contact</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-gray-900">{friend.goal}</p>
                <p className="mt-2 text-sm text-gray-500">Goal (Days)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm">
                <p className="text-lg font-bold text-gray-900 sm:text-xl">
                  {formatDate(friend.next_due_date)}
                </p>
                <p className="mt-2 text-sm text-gray-500">Next Due</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Relationship Goal</h3>
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
                  Edit
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Connect every <span className="font-bold text-gray-900">{friend.goal} days</span>
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
              <h3 className="mb-5 font-semibold text-gray-900">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-4">
                {checkInButtons.map(({ type }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckIn(type)}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-6 transition-all hover:border-gray-300 hover:bg-gray-50"
                  >
                    <img
                      src={CHECK_IN_ICONS[type]}
                      alt={type}
                      className="h-10 w-10 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-700">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
