import { useFriends } from '../context/FriendsContext';
import { getTimeline } from '../utils/helpers';
import FriendCard from '../components/FriendCard';
import LoadingSpinner from '../components/LoadingSpinner';

function getInteractionsThisMonth() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  return getTimeline().filter((entry) => {
    const d = new Date(entry.date + 'T00:00:00');
    return d.getMonth() === month && d.getFullYear() === year;
  }).length;
}

export default function Home() {
  const { friends, loading } = useFriends();

  if (loading) return <LoadingSpinner />;

  const onTrack = friends.filter((f) => f.status === 'on-track').length;
  const needAttention = friends.filter(
    (f) => f.status === 'overdue' || f.status === 'almost due'
  ).length;

  const summaryCards = [
    { label: 'Total Friends', value: friends.length },
    { label: 'On Track', value: onTrack },
    { label: 'Need Attention', value: needAttention },
    { label: 'Interactions This Month', value: getInteractionsThisMonth() },
  ];

  return (
    <div className="bg-page-bg">
      <section className="px-4 py-14 text-center sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Friends to keep close in your life
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 sm:text-lg">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>
        <button className="mt-8 rounded-full bg-keeper-green px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-keeper-green-light">
          + Add a Friend
        </button>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryCards.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-keeper-green sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="mb-6 text-xl font-bold text-gray-900">Your Friends</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
}