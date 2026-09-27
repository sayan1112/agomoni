import React, { createContext, useContext, useState, useEffect } from 'react';

const TimeContext = createContext(null);

export const TIME_PERIODS = [
  {
    key: 'midnight',
    label: 'Midnight',
    startHour: 0,
    previewTime: '12:00 am',
    image: '/bg/midnight-1920.webp',
    mobileImage: '/bg/midnight-mobile.jpg',
    desktopImages: ['/bg/midnight-1920.webp'],
    mobileImages: ['/bg/midnight-mobile.jpg'],
  },
  {
    key: 'earlyMorning',
    label: 'Early Morning',
    startHour: 4,
    previewTime: '4:00 am',
    image: '/bg/early-morning-1920.webp',
    mobileImage: '/bg/early-morning-mobile.jpg',
    desktopImages: ['/bg/early-morning-1920.webp'],
    mobileImages: ['/bg/early-morning-mobile.jpg'],
  },
  {
    key: 'morning',
    label: 'Morning',
    startHour: 7,
    previewTime: '7:00 am',
    image: '/bg/morning-1920.webp',
    mobileImage: '/bg/morning-mobile.jpg',
    desktopImages: ['/bg/morning-1920.webp', '/bg/morning-2-1920.jpg'],
    mobileImages: ['/bg/morning-mobile.jpg', '/bg/morning-2-mobile.jpg'],
  },
  {
    key: 'afternoon',
    label: 'Afternoon',
    startHour: 12,
    previewTime: '12:00 pm',
    image: '/bg/afternoon-1920.webp',
    mobileImage: '/bg/afternoon-mobile.jpg',
    desktopImages: ['/bg/afternoon-1920.webp'],
    mobileImages: ['/bg/afternoon-mobile.jpg'],
  },
  {
    key: 'evening',
    label: 'Evening',
    startHour: 16,
    previewTime: '4:00 pm',
    image: '/bg/evening-1920.webp',
    mobileImage: '/bg/evening-mobile.jpg',
    desktopImages: ['/bg/evening-1920.webp'],
    mobileImages: ['/bg/evening-mobile.jpg'],
  },
  {
    key: 'night',
    label: 'Night',
    startHour: 19,
    previewTime: '7:00 pm',
    image: '/bg/night-1920.webp',
    mobileImage: '/bg/night-mobile.jpg',
    desktopImages: ['/bg/night-1920.webp', '/bg/night-2-1920.jpg'],
    mobileImages: ['/bg/night-mobile.jpg', '/bg/night-2-mobile.jpg'],
  },
];

function getPeriodForHour(hour) {
  let period = TIME_PERIODS[0];
  for (const p of TIME_PERIODS) {
    if (hour >= p.startHour) {
      period = p;
    }
  }
  return period;
}

export function TimeProvider({ children }) {
  const [mode, setMode] = useState('kolkata'); // 'kolkata', 'local', or specific key
  const [realTime, setRealTime] = useState(new Date());
  const [simulatedDate, setSimulatedDate] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentTime = simulatedDate || realTime;

  // Format parts for Kolkata time
  const getKolkataParts = (date = currentTime) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const parts = formatter.formatToParts(date);
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return {
      hour: map.hour,
      minute: map.minute,
      dayPeriod: map.dayPeriod ? map.dayPeriod.toLowerCase() : 'am',
    };
  };

  // Format parts for Local time
  const getLocalParts = (date = currentTime) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });
    const parts = formatter.formatToParts(date);
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return {
      hour: map.hour,
      minute: map.minute,
      dayPeriod: map.dayPeriod ? map.dayPeriod.toLowerCase() : 'am',
    };
  };

  // Get 24-hr hour in Kolkata
  const getKolkataHour24 = (date = currentTime) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: 'numeric',
    });
    return parseInt(formatter.format(date), 10) % 24;
  };

  // Determine current active period
  let currentPeriod;
  if (mode === 'kolkata') {
    const h = getKolkataHour24(currentTime);
    currentPeriod = getPeriodForHour(h);
  } else if (mode === 'local') {
    const h = currentTime.getHours();
    currentPeriod = getPeriodForHour(h);
  } else {
    currentPeriod = TIME_PERIODS.find((p) => p.key === mode) || TIME_PERIODS[2]; // default morning
  }

  // Display time for header
  let displayParts;
  let timezoneLabel = 'IST';
  if (mode === 'local') {
    displayParts = getLocalParts(currentTime);
    timezoneLabel = 'LOCAL';
  } else if (mode === 'kolkata' || !TIME_PERIODS.some((p) => p.key === mode)) {
    displayParts = getKolkataParts(currentTime);
    timezoneLabel = 'IST';
  } else {
    // Manual time period preset preview
    displayParts = {
      hour: currentPeriod.previewTime.split(':')[0],
      minute: currentPeriod.previewTime.split(':')[1].split(' ')[0],
      dayPeriod: currentPeriod.previewTime.split(' ')[1],
    };
    timezoneLabel = currentPeriod.label.toUpperCase();
  }

  return (
    <TimeContext.Provider
      value={{
        mode,
        setMode,
        currentTime,
        currentPeriod,
        displayParts,
        timezoneLabel,
        kolkataTime: getKolkataParts(currentTime),
        localTime: getLocalParts(currentTime),
        simulatedDate,
        setSimulatedDate,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error('useTime must be used within TimeProvider');
  }
  return context;
}
