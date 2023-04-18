import { args } from "./args.js";
import { createCsvWriter, extractPathsFromCsv } from "./csv.js";
import { extractPageTextFromPdfs } from "./pdf.js";
import { searchPagesForKeywords } from "./search.js";

const { rows, columnNames } = await extractPathsFromCsv({
  csvPath: args.csvFile,
  columnName: args.pdfColumn,
});

const csvWriter = createCsvWriter({
  outputFilePath: args.outputFile,
  extraColumnNames: columnNames,
});

async function start() {
  if (!rows.length) return;

  const { path, row } = rows.pop();
  console.log(`Searching pdf file: '${path}'...`);

  try {
    const pdfPageText = await extractPageTextFromPdfs({
      path: path,
      dir: args.pdfDir,
    });

    const searchResults = searchPagesForKeywords({
      pages: pdfPageText,
      keywords: args.keyword,
    });

    if (searchResults.length) {
      await csvWriter.writeRecords(
        searchResults.map(({ keyword, page, caption }) => ({
          ...row,
          keyword,
          page,
          caption,
        }))
      );
      console.log(
        "Done",
        `Matched ${searchResults.length} ${
          searchResults.length === 1 ? "keyword" : "keywords"
        }`
      );
    } else {
      console.log("Done", "No matches found");
    }
  } catch (e) {
    console.log("Failed", e);
  } finally {
    await start();
  }
}

(async () => await start())();
