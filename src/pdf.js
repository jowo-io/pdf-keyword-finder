import { PDFExtract } from "pdf.js-extract";

async function extractPageTextFromPdfs(path) {
  const pdfExtract = new PDFExtract();

  const data = await pdfExtract.extract(`bin/${path}`, {});

  const pages = data.pages.map(({ content }) => {
    return content.map(({ str }) => str).join("");
  });

  return pages;
}

export { extractPageTextFromPdfs };
