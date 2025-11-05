import React from 'react';

const KPI = ({ label, value, sublabel, good }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 sm:p-5">
    <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
    <div className="mt-1 flex items-baseline gap-2">
      <div className="text-2xl sm:text-3xl font-semibold text-white">{value}</div>
      {sublabel && <div className="text-xs text-white/50">{sublabel}</div>}
    </div>
    <div className={`mt-2 text-xs ${good ? 'text-emerald-400' : 'text-amber-300'}`}>
      {good ? 'On target' : 'Needs improvement'}
    </div>
  </div>
);

const KPICards = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 -mt-8 sm:-mt-12 relative z-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <KPI label="MAPE" value="12.8%" sublabel="≤ 15%" good />
        <KPI label="RMSE" value="6.9%" sublabel="≤ 8%" good />
        <KPI label="Beats Baseline" value="+24%" sublabel="vs persistence" good />
        <KPI label="Coverage" value="0–48h" sublabel="15–30m steps" good />
      </div>
    </section>
  );
};

export default KPICards;
