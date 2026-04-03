# demo-gcc – Daglig søk: Finsehytta

Et GitHub Actions-prosjekt som daglig søker etter nyheter om **Finsehytta** og lagrer analyserte resultater.

## Hva det gjør

- Kjører automatisk kl. **07:00 norsk sommertid** (eller manuelt via Actions-siden)
- Søker etter gårsdagens nyheter om «Finsehytta» via DuckDuckGo
- Henter full artikkeltekst fra hvert søkeresultat
- Analyserer innholdet med **GPT-4o** (GitHub Models) og produserer:
  - Oppsummering
  - Kategori (f.eks. nyheter, turisme, overnatting, vær)
  - Sentiment (positiv / nøytral / negativ)
- Lagrer resultatet som en dato-stemplet JSON-fil i `results/`

## Struktur

```
results/
  2026-04-03.json   ← ett resultat per dag
  2026-04-04.json
  ...
search.py           ← søke- og analyseskriptet
requirements.txt    ← Python-avhengigheter
.github/workflows/
  daily-search.yml  ← workflow-definisjon
```

## Kjøre manuelt

Gå til **Actions** → **Daily Finsehytta Search** → **Run workflow**.
