import seedTimeline from '../data/timeline-seed.json';

const TIMELINE_KEY = 'keenkeeper_timeline';

export function initTimeline() {
  if (!localStorage.getItem(TIMELINE_KEY)) {
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(seedTimeline));
  }
}

export function getTimeline() {
  try {
    const data = localStorage.getItem(TIMELINE_KEY);
    return data ? JSON.parse(data) : [...seedTimeline];
  } catch {
    return [...seedTimeline];
  }
}

export function addTimelineEntry(entry) {
  const timeline = getTimeline();
  const newEntry = {
    id: Date.now(),
    ...entry,
    date: new Date().toISOString().split('T')[0],
  };
  timeline.unshift(newEntry);
  localStorage.setItem(TIMELINE_KEY, JSON.stringify(timeline));
  window.dispatchEvent(new Event('timeline-updated'));
  return newEntry;
}

export function getStatusColor(status) {
  switch (status) {
    case 'overdue':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'almost due':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'on-track':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export function getStatusBadge(status) {
  switch (status) {
    case 'overdue':
      return 'bg-red-500 text-white';
    case 'almost due':
      return 'bg-amber-100 text-amber-800';
    case 'on-track':
      return 'bg-keeper-green text-white';
    default:
      return 'bg-gray-400 text-white';
  }
}

export function formatStatusLabel(status) {
  switch (status) {
    case 'overdue':
      return 'Overdue';
    case 'almost due':
      return 'Almost Due';
    case 'on-track':
      return 'On-Track';
    default:
      return status;
  }
}

export function getStatusDot(status) {
  switch (status) {
    case 'overdue':
      return 'bg-status-overdue';
    case 'almost due':
      return 'bg-status-almost';
    case 'on-track':
      return 'bg-status-track';
    default:
      return 'bg-gray-400';
  }
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTimelineDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatInteractionType(type) {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
}
