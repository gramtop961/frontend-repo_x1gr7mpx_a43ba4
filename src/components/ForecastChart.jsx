import React, { useMemo, useState } from 'react';

// Simple responsive SVG line chart without external libs
const Line = ({ data, color, height, width, yDomain, strokeDasharray }) => {
  if (!data.length) return null;
  const [yMin, yMax] = yDomain;
  const xStep = width / (data.length - 1);
  const points = data
    .map((y, i) => {
      const x = i * xStep;
      const ny = height - ((y - yMin) / (yMax - yMin)) * height;
      return `${x},${ny}`;
    })
    .join(' ');
  return (
    <polyline
      points={points}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={strokeDasharray}
    />
  );
};

const Axis = ({ width, height, yTicks = [0, 20, 40, 60, 80, 100] }) => (
  <g>
    {yTicks.map((t) => {
      const y = height - (t / 100) * height;
      return (
        <g key={t}>
          <line x1={0} x2={width} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
          <text x={-6} y={y} dy="0.35em" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">
            {t}%
          </text>
        </g>
      );
    })}
  </g>
);

const makeDemoSeries = (n, seed = 1, noise = 6) => {
  // predictable pseudo-random for demo
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const base = Array.from({ length: n }, (_, i) => {
    const dayCurve = Math.max(0, Math.sin((Math.PI * (i + 6)) / (n - 1)));
    return dayCurve * 90 + rand() * noise;
  });
  const actual = base.map((v) => Math.max(0, Math.min(100, v - 2 + (rand() - 0.5) * noise)));
  const predicted = base.map((v, i) => Math.max(0, Math.min(100, v + (i % 7 === 0 ? 2 : -1) + (rand() - 0.5) * (noise * 0.7))));
  return { actual, predicted };
};

const ForecastChart = () => {
  const [horizon, setHorizon] = useState(48); // hours
  const pointsPerHour = 2; // 30m steps
  const n = horizon * pointsPerHour;

  const { actual, predicted } = useMemo(() => makeDemoSeries(n, 3), [n]);

  const width = 960;
  const height = 280;
  const yDomain = [0, 100];

  const ticks = useMemo(() => Array.from({ length: n }, (_, i) => (i % pointsPerHour === 0 ? i : null)).filter((v) => v !== null), [n]);

  return (
    <section className="max-w-6xl mx-auto px-6 mt-10">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-white text-lg sm:text-xl font-semibold">Forecast vs Actual</h2>
            <p className="text-white/70 text-sm">Normalized to % capacity • 30 min steps • {horizon}h horizon</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white/70 text-sm">Horizon</label>
            <select
              className="bg-transparent text-white border border-white/20 rounded-md px-2 py-1 text-sm focus:outline-none"
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value))}
            >
              <option className="bg-slate-900" value={12}>12h</option>
              <option className="bg-slate-900" value={24}>24h</option>
              <option className="bg-slate-900" value={36}>36h</option>
              <option className="bg-slate-900" value={48}>48h</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <svg width={width + 60} height={height + 50} className="min-w-full">
            <g transform={`translate(50,10)`}>
              <Axis width={width} height={height} />
              <Line data={actual} color="#fca5a5" height={height} width={width} yDomain={yDomain} />
              <Line data={predicted} color="#34d399" height={height} width={width} yDomain={yDomain} strokeDasharray="6 4" />

              {/* X axis ticks every hour */}
              {ticks.map((i) => {
                const x = (i / (n - 1)) * width;
                const label = `${Math.floor(i / pointsPerHour)}h`;
                return (
                  <g key={i}>
                    <line x1={x} x2={x} y1={0} y2={height} stroke="rgba(255,255,255,0.06)" />
                    <text x={x} y={height + 16} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Legend */}
              <g transform={`translate(${width - 160}, ${10})`}>
                <rect width="150" height="40" rx="8" fill="rgba(17,24,39,0.6)" />
                <g transform="translate(10,12)">
                  <line x1="0" x2="16" y1="0" y2="0" stroke="#fca5a5" strokeWidth="3" />
                  <text x="24" y="2.5" fill="white" fontSize="11">Actual</text>
                </g>
                <g transform="translate(10,26)">
                  <line x1="0" x2="16" y1="0" y2="0" stroke="#34d399" strokeWidth="3" strokeDasharray="6 4" />
                  <text x="24" y="2.5" fill="white" fontSize="11">Predicted</text>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="mt-4 text-xs text-white/70">
          Note: Demo data illustrates a daytime curve with stochastic variance. Nighttime periods are implicitly near 0%, reducing MAPE distortion.
        </div>
      </div>
    </section>
  );
};

export default ForecastChart;
