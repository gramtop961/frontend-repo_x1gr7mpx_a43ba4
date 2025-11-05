import React from 'react';
import { Sun, Thermometer, Cloud, Droplets, Gauge, Wind, Timer, Clock } from 'lucide-react';

const Item = ({ icon: Icon, label, desc, value }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-white/5 text-emerald-300"><Icon size={18} /></div>
      <div>
        <div className="text-white font-medium flex items-center gap-2">
          {label}
          {value && <span className="text-xs text-white/60 font-normal">{value}</span>}
        </div>
        <p className="text-white/70 text-sm mt-1">{desc}</p>
      </div>
    </div>
  </div>
);

const WeatherInsights = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg sm:text-xl font-semibold">Weather Insights</h3>
        <span className="text-xs text-white/60">Drivers of generation</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Item icon={Thermometer} label="Temperature (°C)" value="23°C" desc="Ambient air temperature; higher temps can slightly reduce panel efficiency." />
        <Item icon={Cloud} label="Cloud Cover (%)" value="40%" desc="Fraction of the sky covered by clouds; higher values reduce irradiance." />
        <Item icon={Droplets} label="Humidity (%)" value="58%" desc="Relative humidity; high values can scatter light and slightly reduce radiation." />
        <Item icon={Sun} label="Irradiance (W/m²)" value="720" desc="Total solar radiation on a horizontal surface; primary driver of output." />
        <Item icon={Gauge} label="Surface Pressure (hPa)" value="1014" desc="Atmospheric pressure near ground; low pressure often implies cloudy/rainy." />
        <Item icon={Wind} label="Wind Speed (m/s)" value="2.3" desc="Wind cools panels (aiding efficiency) and correlates with passing clouds." />
        <Item icon={Clock} label="Solar Zenith (°)" value="36°" desc="Angle from vertical; lower angles (near noon) increase irradiance." />
        <Item icon={Timer} label="Period" value="PT30M" desc="Sampling interval; used for rolling averages and lagged features." />
      </div>

      <div className="mt-6 text-sm text-white/80 rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
        <span className="font-medium text-emerald-300">Quick insight:</span> On this window, irradiance and cloud cover dominate variance. Temperature and wind provide secondary adjustments via panel efficiency and cooling. Daytime-only filtering keeps error metrics meaningful.
      </div>
    </section>
  );
};

export default WeatherInsights;
