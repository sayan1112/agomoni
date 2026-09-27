import React, { useState, useEffect } from 'react';
import { useTime, TIME_PERIODS } from '../context/TimeContext';

export default function BackgroundLayer() {
  const { currentPeriod } = useTime();
  const [subIndex, setSubIndex] = useState(() => Math.floor(Math.random() * 10));

  // Automatically cycle / shuffle alternate scenes within the active time period every 25 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSubIndex((prev) => prev + 1);
    }, 25000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#18191e]">
      {/* Desktop Background Layer (md screens and larger) */}
      <div className="hidden md:block absolute inset-0">
        {TIME_PERIODS.map((period) => {
          const isCurrent = currentPeriod.key === period.key;
          const desktopList = period.desktopImages || [period.image];
          const activeDesktopIdx = subIndex % desktopList.length;

          return desktopList.map((imgUrl, idx) => {
            const isVisible = isCurrent && idx === activeDesktopIdx;
            return (
              <div
                key={`desktop-${period.key}-${idx}`}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                  isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  backgroundImage: `url(${imgUrl})`,
                }}
              />
            );
          });
        })}
      </div>

      {/* Mobile Smartphone Background Layer (portrait optimized) */}
      <div className="block md:hidden absolute inset-0">
        {TIME_PERIODS.map((period) => {
          const isCurrent = currentPeriod.key === period.key;
          const mobileList = period.mobileImages || [period.mobileImage || period.image];
          const activeMobileIdx = subIndex % mobileList.length;

          return mobileList.map((imgUrl, idx) => {
            const isVisible = isCurrent && idx === activeMobileIdx;
            return (
              <div
                key={`mobile-${period.key}-${idx}`}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                  isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  backgroundImage: `url(${imgUrl})`,
                }}
              />
            );
          });
        })}
        {/* Subtle mobile readability gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65 pointer-events-none" />
      </div>
    </div>
  );
}
