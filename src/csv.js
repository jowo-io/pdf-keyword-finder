import fs from "fs";
import csvReadableStream from "csv-reader";
import { createObjectCsvWriter } from "csv-writer";

const outputDir = "bin/output";

function createCsvWriter({ outputFilePath, extraColumnNames = {} }) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const csvWriter = createObjectCsvWriter({
    path: `${outputDir}/${outputFilePath}`,
    header: [
      ...extraColumnNames.map((cn) => ({ id: cn, title: cn })),
      { id: "keyword", title: "Keyword" },
      { id: "page", title: "Page" },
      { id: "caption", title: "Caption" },
    ],
  });
  return csvWriter;
}

function extractPathsFromCsv({ csvPath, columnName }) {
  let columnNames;
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
          columnNames = row;
          console.log("columnName", columnName);
          if (index === -1) {
            reject(
              `A column with the title of '${columnName}' could not be found in '${csvPath}'`
            );
          }
        } else {
          rows.push({
            path: row[index],
            row: columnNames.reduce(
              (acc, n, i) => ({
                ...acc,
                [n]: row[i],
              }),
              {}
            ),
          });
        }
      })
      .on("end", function () {
        resolve({ rows, columnNames });
      })
      .on("error", function (e) {
        reject(e);
      });
  });
}

export { createCsvWriter, extractPathsFromCsv };
