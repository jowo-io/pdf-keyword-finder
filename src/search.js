import { fuzzy } from "fast-fuzzy";

function searchPagesForKeywords({ pages, keywords }) {
  const matches = [];

  for (let p = 0; p < pages.length; p++) {
    let page = pages[p];
    for (let k = 0; k < keywords.length; k++) {
      let keyword = keywords[k];
      const f = fuzzy(keyword, page, { returnMatchData: true });
      if (f.score >= 0.95) {
        matches.push({ keyword, page: p + 1, caption: f.original });
      }
    }
  }

  return matches;
}

export { searchPagesForKeywords };
