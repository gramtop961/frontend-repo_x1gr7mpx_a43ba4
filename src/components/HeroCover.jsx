import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = () => {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Gradient overlay for readability without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-start justify-center text-white">
        <span className="inline-flex items-center gap-2 text-emerald-300/90 uppercase tracking-wider text-xs sm:text-sm font-semibold mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SolarCast • 0–48h Forecasting
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
          Day‑Ahead Solar Power Forecasts
          <span className="block text-emerald-300 font-light">for a 5 MW site</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/80">
          Predict, compare, and explain short‑term solar output with weather‑driven insights and clear KPIs.
        </p>
      </div>
    </section>
  );
};

export default HeroCover;
