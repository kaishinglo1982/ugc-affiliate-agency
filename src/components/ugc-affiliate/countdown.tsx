'use client';

import { useEffect, useState } from 'react';

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ];

  return (
    <div className="flex gap-3" role="timer" aria-label="Time until drop">
      {units.map((u) => (
        <div key={u.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
          <p className="font-mono text-2xl font-black tabular-nums">{String(u.value).padStart(2, '0')}</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-bone/40">{u.label}</p>
        </div>
      ))}
    </div>
  );
}
