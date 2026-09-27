import React from 'react';
import { useTime, TIME_PERIODS } from '../context/TimeContext';

export default function BackgroundLayer() {
  const { currentPeriod } = useTime();

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#18191e]">
      {TIME_PERIODS.map((period) => {
        const isCurrent = currentPeriod.key === period.key;
        return (
          <div
            key={period.key}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${period.image})`,
            }}
          />
        );
      })}

    </div>
  );
}
