import { useState } from 'react';
import type { SearchResult } from '../types';
import SentimentBadge from './SentimentBadge';
import CategoryBadge from './CategoryBadge';

export default function ResultCard({ result, index }: { result: SearchResult; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="group rounded-2xl bg-stone-800/50 border border-stone-700/40 p-5 transition-all duration-300 hover:bg-stone-800/70 hover:border-stone-600/50 hover:shadow-lg hover:shadow-amber-900/5"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex flex-wrap items-start gap-2 mb-3">
        <CategoryBadge category={result.category} />
        <SentimentBadge sentiment={result.sentiment} />
      </div>

      <h3 className="font-heading text-lg font-semibold text-stone-100 leading-snug mb-2">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors duration-200"
        >
          {result.title}
          <span className="inline-block ml-1.5 opacity-0 group-hover:opacity-60 transition-opacity text-sm align-top">&nearr;</span>
        </a>
      </h3>

      <p className="text-stone-400 text-sm leading-relaxed mb-3">
        {result.summary}
      </p>

      {result.body_text && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors cursor-pointer font-medium tracking-wide uppercase"
          >
            {expanded ? 'Skjul tekst' : 'Vis artikkeltekst'}
          </button>
          {expanded && (
            <div className="mt-3 p-4 rounded-xl bg-stone-900/60 border border-stone-700/30 text-stone-400 text-sm leading-relaxed max-h-64 overflow-y-auto whitespace-pre-line">
              {result.body_text}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
