import React from 'react';
import HeroCover from './components/HeroCover';
import KPICards from './components/KPICards';
import ForecastChart from './components/ForecastChart';
import WeatherInsights from './components/WeatherInsights';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HeroCover />
      <KPICards />
      <ForecastChart />
      <WeatherInsights />

      <footer className="max-w-6xl mx-auto px-6 py-10 text-xs text-white/50">
        SolarCast MVP • Single-site (5 MW) • Replay data • Demo UI. KPIs reflect targets: MAPE ≤ 15%, RMSE ≤ 8%, beat persistence ≥ 20%.
      </footer>
    </div>
  );
}

export default App;
