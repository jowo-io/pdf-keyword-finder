import { args } from "./args.js";
import { createCsvWriter, extractPathsFromCsv } from "./csv.js";
import { extractPageTextFromPdfs } from "./pdf.js";
import { searchPagesForKeywords } from "./search.js";

const csvWriter = createCsvWriter(args.output);

const pdfPaths = await extractPathsFromCsv({
  csvPath: args.csv,
  columnName: args.column,
});

async function start() {
  if (!pdfPaths.length) return;

  const pdfPath = pdfPaths.pop();
  console.log(`Searching pdf file: '${pdfPath}'...`);
  try {
    const pdfPageText = await extractPageTextFromPdfs({
      path: pdfPath,
      dir: args.pdfDir,
    });

    const searchResults = searchPagesForKeywords({
      pages: pdfPageText,
      keywords: args.keyword,
    });

    if (searchResults.length) {
      await csvWriter.writeRecords(
        searchResults.map(({ keyword, page }) => ({
          keyword,
          page,
          file: pdfPath,
        }))
      );
    }

    console.log("Done");
  } catch (e) {
    console.log("Failed", e);
  } finally {
    await start(pdfPath);
  }
}

(async () => await start())();
