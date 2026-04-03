"""
search.py – Søker Google (via SerpAPI) for gårsdagens artikler om «Finsehytta»,
henter full artikkeltekst og analyserer med GPT-4o via GitHub Models.
Skriver resultatet til results/YYYY-MM-DD.json (gårsdagens dato).
"""

import json
import os
import sys
from datetime import date, timedelta
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from openai import OpenAI

QUERY = "Finsehytta"
MAX_RESULTS = 10
MAX_ARTICLE_CHARS = 4000  # Begrens artikkeltekst sendt til LLM

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("Feil: GITHUB_TOKEN er ikke satt.", file=sys.stderr)
    sys.exit(1)

SERPAPI_KEY = os.environ.get("SERPAPI_KEY")
if not SERPAPI_KEY:
    print("Feil: SERPAPI_KEY er ikke satt.", file=sys.stderr)
    sys.exit(1)

llm = OpenAI(
    base_url="https://models.github.ai/inference",
    api_key=GITHUB_TOKEN,
)


def search_google(query: str) -> list[dict]:
    """Henter søkeresultater fra siste 24 timer via SerpAPI (Google)."""
    resp = requests.get(
        "https://serpapi.com/search.json",
        params={
            "engine": "google",
            "q": query,
            "tbs": "qdr:d",
            "num": MAX_RESULTS,
            "hl": "no",
            "gl": "no",
            "api_key": SERPAPI_KEY,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json().get("organic_results", [])


def fetch_article_text(url: str) -> str:
    """Henter og renser artikkeltekst fra en URL."""
    try:
        resp = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()
        text = soup.get_text(separator="\n", strip=True)
        return text[:MAX_ARTICLE_CHARS]
    except Exception as exc:
        return f"[Kunne ikke hente artikkelen: {exc}]"


def analyse_with_llm(title: str, body: str) -> dict:
    """Sender artikkelen til GPT-4o og returnerer oppsummering, kategori og sentiment."""
    prompt = f"""Du er en assistent som analyserer norske nyhetsartikler.

Artikkel:
Tittel: {title}
Innhold:
{body}

Svar KUN med et JSON-objekt (ingen forklaring utenfor JSON) med disse nøklene:
- "summary": kort norsk oppsummering (1-3 setninger)
- "category": én av disse kategoriene: nyheter, turisme, overnatting, vær, sport, annet
- "sentiment": én av: positiv, nøytral, negativ"""

    response = llm.chat.completions.create(
        model="openai/gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={"type": "json_object"},
    )
    content = response.choices[0].message.content
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {"summary": content, "category": "ukjent", "sentiment": "nøytral"}


def main():
    yesterday = date.today() - timedelta(days=1)
    date_str = yesterday.isoformat()
    output_path = Path("results") / f"{date_str}.json"

    if output_path.exists():
        print(f"Resultatfil {output_path} finnes allerede – hopper over.")
        return

    print(f"Søker etter '{QUERY}' (gårsdagens resultater: {date_str}) ...")
    raw_results = search_google(QUERY)

    if not raw_results:
        print("Ingen resultater funnet.")
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(
            json.dumps({"date": date_str, "query": QUERY, "results": []}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        return

    enriched = []
    for i, item in enumerate(raw_results, 1):
        url = item.get("link", "")
        title = item.get("title", "Uten tittel")
        print(f"  [{i}/{len(raw_results)}] {title[:60]} ...")

        body = fetch_article_text(url)
        analysis = analyse_with_llm(title, body)

        enriched.append({
            "title": title,
            "url": url,
            "body_text": body,
            "summary": analysis.get("summary", ""),
            "category": analysis.get("category", "ukjent"),
            "sentiment": analysis.get("sentiment", "nøytral"),
        })

    output = {"date": date_str, "query": QUERY, "results": enriched}
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(output, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Lagret {len(enriched)} resultater til {output_path}")


if __name__ == "__main__":
    main()
