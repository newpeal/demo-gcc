import { useState, useEffect } from 'react';
import type { DayData } from '../types';

const BASE = import.meta.env.BASE_URL;

export function useManifest() {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}data/manifest.json`)
      .then(r => r.json())
      .then(d => {
        setDates([...d.dates].reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { dates, loading };
}

export function useDayData(date: string | null) {
  const [data, setData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) { setData(null); return; }
    setLoading(true);
    fetch(`${BASE}data/${date}.json`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [date]);

  return { data, loading };
}
