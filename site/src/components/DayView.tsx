import { useState, useMemo } from 'react';
import type { DayData } from '../types';
import FilterBar from './FilterBar';
import ResultCard from './ResultCard';

function formatDateLong(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DayView({ data, loading }: { data: DayData | null; loading: boolean }) {
  const [category, setCategory] = useState('alle');
  const [sentiment, setSentiment] = useState('alle');

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.results.filter(r => {
      if (category !== 'alle' && r.category !== category) return false;
      if (sentiment !== 'alle' && r.sentiment !== sentiment) return false;
      return true;
    });
  }, [data, category, sentiment]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-500">
        <svg className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-sm">Velg en dato for a se resultater</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-semibold text-stone-100 mb-1">
          {formatDateLong(data.date)}
        </h2>
        <p className="text-sm text-stone-500">
          Sok: <span className="text-amber-400/80 font-medium">{data.query}</span>
        </p>
      </div>

      <FilterBar
        category={category}
        sentiment={sentiment}
        onCategoryChange={setCategory}
        onSentimentChange={setSentiment}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <p className="text-stone-500 text-sm py-8 text-center">Ingen resultater matcher filteret.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((result, i) => (
            <ResultCard key={`${result.url}-${i}`} result={result} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
