interface DateListProps {
  dates: string[];
  selected: string | null;
  onSelect: (date: string) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('nb-NO', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function DateList({ dates, selected, onSelect }: DateListProps) {
  return (
    <nav className="flex flex-col gap-1">
      <h2 className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2 px-3">
        Datoer
      </h2>
      {dates.map(date => {
        const isActive = date === selected;
        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-900/10'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200 border border-transparent'
            }`}
          >
            <span className="font-medium">{formatDate(date)}</span>
            <span className="block text-xs text-stone-500 mt-0.5 font-mono">{date}</span>
          </button>
        );
      })}
      {dates.length === 0 && (
        <p className="text-stone-500 text-sm px-3">Ingen data enna.</p>
      )}
    </nav>
  );
}
