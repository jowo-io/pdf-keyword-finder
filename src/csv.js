import fs from "fs";
import csvReadableStream from "csv-reader";
import { createObjectCsvWriter } from "csv-writer";

const outputDir = "bin/output";

function createCsvWriter(outputFilePath) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const csvWriter = createObjectCsvWriter({
    path: `${outputDir}/${outputFilePath}`,
    header: [
      { id: "keyword", title: "Keyword" },
      { id: "page", title: "Page" },
      { id: "file", title: "File" },
    ],
  });
  return csvWriter;
}

function extractPathsFromCsv({ csvPath, columnName }) {
  let rows = [];
  let index;
  let inputStream = fs.createReadStream(`bin/${csvPath}`, "utf8");
  return new Promise((resolve, reject) => {
    inputStream
      .pipe(
        new csvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
        })
      )
      .on("data", function (row) {
        if (typeof index === "undefined") {
          index = row.indexOf(columnName);
          if (index === -1) {
            reject(
              `A column with the title of '${columnName}' could not be found in '${csvPath}'`
            );
          }
        } else {
          rows.push(row[index]);
        }
      })
      .on("end", function () {
        resolve(rows);
      })
      .on("error", function (e) {
        reject(err);
      });
  });
}

export { createCsvWriter, extractPathsFromCsv };
