import type { SearchResult } from '../types';

const config: Record<SearchResult['category'], { label: string; className: string }> = {
  nyheter: { label: 'Nyheter', className: 'bg-sky-400/15 text-sky-300 ring-sky-400/30' },
  turisme: { label: 'Turisme', className: 'bg-amber-400/15 text-amber-300 ring-amber-400/30' },
  overnatting: { label: 'Overnatting', className: 'bg-violet-400/15 text-violet-300 ring-violet-400/30' },
  'vær': { label: 'Vaer', className: 'bg-cyan-400/15 text-cyan-300 ring-cyan-400/30' },
  sport: { label: 'Sport', className: 'bg-lime-400/15 text-lime-300 ring-lime-400/30' },
  annet: { label: 'Annet', className: 'bg-stone-400/15 text-stone-400 ring-stone-400/30' },
};

export default function CategoryBadge({ category }: { category: SearchResult['category'] }) {
  const c = config[category] ?? config.annet;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${c.className}`}>
      {c.label}
    </span>
  );
}
