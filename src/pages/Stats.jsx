import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getTimeline, initTimeline } from '../utils/helpers';

const CHART_COLORS = {
  Text: '#8b5cf6',
  Call: '#2d5a43',
  Video: '#4ade80',
};

const LEGEND_ORDER = ['Text', 'Call', 'Video'];

function CustomLegend({ data }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
      {LEGEND_ORDER.map((name) => {
        const item = data.find((d) => d.name === name);
        if (!item) return null;
        return (
          <div key={name} className="flex items-center gap-2 text-sm text-gray-600">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: CHART_COLORS[name] }}
            />
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Stats() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    initTimeline();
    const refresh = () => {
      const entries = getTimeline();
      const counts = { Call: 0, Text: 0, Video: 0 };
      entries.forEach((e) => {
        const key = e.type.charAt(0).toUpperCase() + e.type.slice(1);
        if (counts[key] !== undefined) counts[key]++;
      });
      setChartData(
        LEGEND_ORDER.map((name) => ({ name, value: counts[name] }))
      );
    };
    refresh();
    window.addEventListener('timeline-updated', refresh);
    return () => window.removeEventListener('timeline-updated', refresh);
  }, []);

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="min-h-full bg-page-bg">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Friendship Analytics</h1>

        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="mb-8 text-sm text-gray-500">By Interaction Type</p>

          {total === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-500">No interaction data yet.</p>
              <p className="mt-2 text-sm text-gray-400">
                Log calls, texts, or video chats from a friend&apos;s detail page to see analytics.
              </p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={chartData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData
                      .filter((d) => d.value > 0)
                      .map((entry) => (
                        <Cell key={entry.name} fill={CHART_COLORS[entry.name]} />
                      ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <CustomLegend data={chartData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
