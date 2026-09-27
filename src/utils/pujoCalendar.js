/**
 * Perpetual Durga Puja Calendar Utility
 * Automatically handles countdowns, Mahalaya detection, and active Pujo days
 * for this year and EVERY future year!
 */

export const PUJO_CALENDAR = {
  2024: {
    mahalaya: '2024-10-02',
    sasthi: '2024-10-09',
    saptami: '2024-10-10',
    ashtami: '2024-10-11',
    navami: '2024-10-12',
    dashami: '2024-10-13',
  },
  2025: {
    mahalaya: '2025-09-21',
    sasthi: '2025-09-28',
    saptami: '2025-09-29',
    ashtami: '2025-09-30',
    navami: '2025-10-01',
    dashami: '2025-10-02',
  },
  2026: {
    mahalaya: '2026-10-10',
    sasthi: '2026-10-16',
    saptami: '2026-10-17',
    ashtami: '2026-10-18',
    navami: '2026-10-19',
    dashami: '2026-10-20',
  },
  2027: {
    mahalaya: '2027-09-30',
    sasthi: '2027-10-05',
    saptami: '2027-10-06',
    ashtami: '2027-10-07',
    navami: '2027-10-08',
    dashami: '2027-10-09',
  },
  2028: {
    mahalaya: '2028-09-18',
    sasthi: '2028-09-24',
    saptami: '2028-09-25',
    ashtami: '2028-09-26',
    navami: '2028-09-27',
    dashami: '2028-09-28',
  },
  2029: {
    mahalaya: '2029-10-07',
    sasthi: '2029-10-13',
    saptami: '2029-10-14',
    ashtami: '2029-10-15',
    navami: '2029-10-16',
    dashami: '2029-10-17',
  },
  2030: {
    mahalaya: '2030-09-25',
    sasthi: '2030-10-02',
    saptami: '2030-10-03',
    ashtami: '2030-10-04',
    navami: '2030-10-05',
    dashami: '2030-10-06',
  },
  2031: {
    mahalaya: '2031-10-15',
    sasthi: '2031-10-22',
    saptami: '2031-10-23',
    ashtami: '2031-10-24',
    navami: '2031-10-25',
    dashami: '2031-10-26',
  },
  2032: {
    mahalaya: '2032-10-03',
    sasthi: '2032-10-10',
    saptami: '2032-10-11',
    ashtami: '2032-10-12',
    navami: '2032-10-13',
    dashami: '2032-10-14',
  },
  2033: {
    mahalaya: '2033-09-23',
    sasthi: '2033-09-29',
    saptami: '2033-09-30',
    ashtami: '2033-10-01',
    navami: '2033-10-02',
    dashami: '2033-10-03',
  },
  2034: {
    mahalaya: '2034-10-12',
    sasthi: '2034-10-18',
    saptami: '2034-10-19',
    ashtami: '2034-10-20',
    navami: '2034-10-21',
    dashami: '2034-10-22',
  },
  2035: {
    mahalaya: '2035-10-01',
    sasthi: '2035-10-07',
    saptami: '2035-10-08',
    ashtami: '2035-10-09',
    navami: '2035-10-10',
    dashami: '2035-10-11',
  },
  2036: {
    mahalaya: '2036-09-20',
    sasthi: '2036-09-26',
    saptami: '2036-09-27',
    ashtami: '2036-09-28',
    navami: '2036-09-29',
    dashami: '2036-09-30',
  },
  2037: {
    mahalaya: '2037-10-09',
    sasthi: '2037-10-15',
    saptami: '2037-10-16',
    ashtami: '2037-10-17',
    navami: '2037-10-18',
    dashami: '2037-10-19',
  },
  2038: {
    mahalaya: '2038-09-28',
    sasthi: '2038-10-04',
    saptami: '2038-10-05',
    ashtami: '2038-10-06',
    navami: '2038-10-07',
    dashami: '2038-10-08',
  },
  2039: {
    mahalaya: '2039-09-18',
    sasthi: '2039-09-24',
    saptami: '2039-09-25',
    ashtami: '2039-09-26',
    navami: '2039-09-27',
    dashami: '2039-09-28',
  },
  2040: {
    mahalaya: '2040-10-05',
    sasthi: '2040-10-11',
    saptami: '2040-10-12',
    ashtami: '2040-10-13',
    navami: '2040-10-14',
    dashami: '2040-10-15',
  }
};

/**
 * Returns complete Pujo information dynamically based on current date
 */
export function getPujoStatus(now = new Date()) {
  const currentYear = now.getFullYear();

  // Find target year (if this year's Dashami is over, target next year)
  let targetYear = currentYear;
  let yearData = PUJO_CALENDAR[targetYear];

  // If no calendar entry exists for a far future year, fallback dynamically
  if (!yearData) {
    const approxSasthi = new Date(`${targetYear}-10-10T00:00:00+05:30`);
    return {
      targetYear,
      daysLeft: Math.max(0, Math.ceil((approxSasthi - now) / (1000 * 60 * 60 * 24))),
      isPujoActive: false,
      isMahalayaDay: false,
      activeTithi: null,
      sasthiDateStr: `${targetYear}-10-10`,
      bengaliTithiName: ''
    };
  }

  const dashamiDate = new Date(`${yearData.dashami}T23:59:59+05:30`);
  // If more than 3 days after Dashami, roll over to the next year's countdown
  const postBijoyaDate = new Date(dashamiDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  if (now > postBijoyaDate) {
    targetYear += 1;
    yearData = PUJO_CALENDAR[targetYear] || {
      mahalaya: `${targetYear}-10-01`,
      sasthi: `${targetYear}-10-08`,
      dashami: `${targetYear}-10-12`
    };
  }

  const sasthiDate = new Date(`${yearData.sasthi}T00:00:00+05:30`);
  const mahalayaDate = new Date(`${yearData.mahalaya}T00:00:00+05:30`);

  // Today's date string YYYY-MM-DD in IST
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const todayStr = formatter.format(now);

  // Derive Panchami date (1 day before Sasthi)
  const panchamiDate = new Date(sasthiDate.getTime() - 24 * 60 * 60 * 1000);
  const panchamiStr = formatter.format(panchamiDate);

  // Check specific tithis and set dynamic Bengali greeting for CenterTitle
  let activeTithi = null;
  let bengaliTithiName = null;
  let isPujoActive = false;
  let isMahalayaDay = (todayStr === yearData.mahalaya);
  let bengaliGreeting = { line1: 'পুজো', line2: 'আসছে' };

  if (todayStr === yearData.mahalaya) {
    activeTithi = 'Mahalaya';
    bengaliTithiName = 'মহালয়া';
    bengaliGreeting = { line1: 'শুভ', line2: 'মহালয়া' };
  } else if (todayStr === panchamiStr) {
    activeTithi = 'Maha Panchami';
    bengaliTithiName = 'মহা পঞ্চমী';
    bengaliGreeting = { line1: 'শুভ', line2: 'মহা পঞ্চমী' };
    isPujoActive = true;
  } else if (todayStr === yearData.sasthi) {
    activeTithi = 'Maha Sasthi';
    bengaliTithiName = 'মহা ষষ্ঠী';
    bengaliGreeting = { line1: 'শুভ', line2: 'মহা ষষ্ঠী' };
    isPujoActive = true;
  } else if (todayStr === yearData.saptami) {
    activeTithi = 'Maha Saptami';
    bengaliTithiName = 'মহা সপ্তমী';
    bengaliGreeting = { line1: 'শুভ', line2: 'মহা সপ্তমী' };
    isPujoActive = true;
  } else if (todayStr === yearData.ashtami) {
    activeTithi = 'Maha Ashtami';
    bengaliTithiName = 'মহা অষ্টমী';
    bengaliGreeting = { line1: 'শুভ', line2: 'মহা অষ্টমী' };
    isPujoActive = true;
  } else if (todayStr === yearData.navami) {
    activeTithi = 'Maha Navami';
    bengaliTithiName = 'মহা নবমী';
    bengaliGreeting = { line1: 'শুভ', line2: 'মহা নবমী' };
    isPujoActive = true;
  } else if (todayStr === yearData.dashami) {
    activeTithi = 'Vijaya Dashami';
    bengaliTithiName = 'বিজয়া দশমী';
    bengaliGreeting = { line1: 'শুভ', line2: 'বিজয়া দশমী' };
    isPujoActive = true;
  } else if (now > dashamiDate && now <= postBijoyaDate) {
    activeTithi = 'Subho Bijoya';
    bengaliTithiName = 'শুভ বিজয়া';
    bengaliGreeting = { line1: 'শুভ', line2: 'বিজয়া' };
    isPujoActive = true;
  }

  // Calculate days left to Sasthi
  const diffTime = sasthiDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return {
    targetYear,
    daysLeft,
    isPujoActive,
    isMahalayaDay,
    activeTithi,
    bengaliTithiName,
    bengaliGreeting,
    sasthiDateStr: yearData.sasthi,
    mahalayaDateStr: yearData.mahalaya,
    yearData
  };
}
