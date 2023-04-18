import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .usage("This is my awesome program")
  .options({
    csv: {
      description: "",
      required: true,
      string: true,
      alias: "csv",
    },
    output: {
      description: "",
      required: true,
      string: true,
      alias: "o",
    },
    column: {
      description: "",
      string: true,
      required: true,
      alias: "c",
    },
    keyword: {
      description: "",
      string: true,
      required: true,
      alias: "k",
    },
  }).argv;

export { args };
