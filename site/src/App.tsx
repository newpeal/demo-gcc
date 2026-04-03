import { useState, useEffect } from 'react';
import { useManifest, useDayData } from './hooks/useSearchData';
import DateList from './components/DateList';
import DayView from './components/DayView';

export default function App() {
  const { dates, loading: manifestLoading } = useManifest();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data, loading: dayLoading } = useDayData(selectedDate);

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(217,119,6,0.04)_0%,_transparent_60%)]" />

      <header className="relative border-b border-stone-800/60">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-baseline gap-3">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-stone-50 tracking-tight">
              Finsehytta
            </h1>
            <span className="text-amber-400/60 text-sm font-medium tracking-widest uppercase">
              Medieoversikt
            </span>
          </div>
          <p className="mt-2 text-stone-500 text-sm max-w-xl">
            Daglig medieovervaking med automatisk sokeanalyse
          </p>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {manifestLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="md:w-56 shrink-0">
              <div className="md:sticky md:top-8">
                <DateList dates={dates} selected={selectedDate} onSelect={setSelectedDate} />
              </div>
            </aside>

            {/* Main content */}
            <section className="flex-1 min-w-0">
              <DayView data={data} loading={dayLoading} />
            </section>
          </div>
        )}
      </main>

      <footer className="relative border-t border-stone-800/40 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-xs text-stone-600">
            Drevet av GitHub Actions &middot; SerpAPI &middot; GitHub Models
          </p>
        </div>
      </footer>
    </div>
  );
}
