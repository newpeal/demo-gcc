import type { SearchResult } from '../types';

const config: Record<SearchResult['sentiment'], { label: string; className: string }> = {
  positiv: { label: 'Positiv', className: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30' },
  'nøytral': { label: 'Noytral', className: 'bg-stone-400/15 text-stone-300 ring-stone-400/30' },
  negativ: { label: 'Negativ', className: 'bg-rose-400/15 text-rose-300 ring-rose-400/30' },
};

export default function SentimentBadge({ sentiment }: { sentiment: SearchResult['sentiment'] }) {
  const c = config[sentiment];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${c.className}`}>
      {c.label}
    </span>
  );
}
