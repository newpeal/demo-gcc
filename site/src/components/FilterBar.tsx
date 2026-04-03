import type { SearchResult } from '../types';

const categories: (SearchResult['category'] | 'alle')[] = ['alle', 'nyheter', 'turisme', 'overnatting', 'vær', 'sport', 'annet'];
const sentiments: (SearchResult['sentiment'] | 'alle')[] = ['alle', 'positiv', 'nøytral', 'negativ'];

interface FilterBarProps {
  category: string;
  sentiment: string;
  onCategoryChange: (v: string) => void;
  onSentimentChange: (v: string) => void;
  resultCount: number;
}

export default function FilterBar({ category, sentiment, onCategoryChange, onSentimentChange, resultCount }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Kategori</label>
        <select
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
          className="bg-stone-800 border border-stone-700/50 text-stone-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 cursor-pointer"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'alle' ? 'Alle' : c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Sentiment</label>
        <select
          value={sentiment}
          onChange={e => onSentimentChange(e.target.value)}
          className="bg-stone-800 border border-stone-700/50 text-stone-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 cursor-pointer"
        >
          {sentiments.map(s => (
            <option key={s} value={s}>{s === 'alle' ? 'Alle' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <span className="ml-auto text-xs text-stone-500">
        {resultCount} {resultCount === 1 ? 'resultat' : 'resultater'}
      </span>
    </div>
  );
}
