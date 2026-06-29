import { useState, useEffect } from 'react';
import { TIMELINE_ICONS } from '../constants/assets';
import {
  getTimeline,
  initTimeline,
  formatTimelineDate,
  formatInteractionType,
} from '../utils/helpers';

const filterOptions = ['All', 'Call', 'Text', 'Video', 'Meetup'];

function getFriendName(entry) {
  return entry.friendName || entry.title?.replace(/^(Call|Text|Video|Meetup) with /i, '') || '';
}

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    initTimeline();
    const refresh = () => setEntries(getTimeline());
    refresh();
    window.addEventListener('timeline-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('timeline-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const filtered =
    activeFilter === 'All'
      ? entries
      : entries.filter((e) => e.type === activeFilter.toLowerCase());

  return (
    <div className="min-h-full bg-page-bg">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Timeline</h1>

        <div className="relative mb-6 max-w-xs">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pr-10 pl-4 text-sm text-gray-700 shadow-sm focus:border-keeper-green focus:outline-none"
            aria-label="Filter timeline"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'Filter timeline' : option}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute top-1/2 right-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-lg text-gray-500">No timeline entries found.</p>
            <p className="mt-2 text-sm text-gray-400">
              Try a different filter or log an interaction from a friend&apos;s page.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4"
              >
                <img
                  src={TIMELINE_ICONS[entry.type]}
                  alt={entry.type}
                  className="h-10 w-10 shrink-0 object-contain"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                    <span className="font-bold">{formatInteractionType(entry.type)}</span>
                    {' with '}
                    {getFriendName(entry)}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-400">
                    {formatTimelineDate(entry.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
