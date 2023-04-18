import yargs from "yargs";

const args = yargs(process.argv.slice(2)).options({
  csvFile: {
    description:
      "The CSV source file to use which contains a column of PDF file names which should be text-searched.",
    required: true,
    string: true,
    alias: "csv",
  },
  pdfDir: {
    description:
      "An optional directory where your PDFs to be searched are located.",
    string: true,
    alias: "p",
  },
  pdfColumn: {
    description:
      "The name of the column that contains the PDF filenames to be search.",
    string: true,
    required: true,
    alias: "c",
  },
  outputFile: {
    description: "The name of the CSV file to save the search results to.",
    required: true,
    string: true,
    alias: "o",
  },
  keyword: {
    description:
      "The search phrases you would like to find in the PDFs being search. (You can provide as many keywords as you like. See README.md for examples)",
    array: true,
    required: true,
    alias: "k",
  },
}).argv;

export { args };
