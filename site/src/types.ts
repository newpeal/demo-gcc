export interface SearchResult {
  title: string;
  url: string;
  body_text: string;
  summary: string;
  category: 'nyheter' | 'turisme' | 'overnatting' | 'vær' | 'sport' | 'annet';
  sentiment: 'positiv' | 'nøytral' | 'negativ';
}

export interface DayData {
  date: string;
  query: string;
  results: SearchResult[];
}
