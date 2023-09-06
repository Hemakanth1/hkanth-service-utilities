import readXlsxFile from "read-excel-file/node";
import logger from "./logger";

const readExcelSheet = async (file) => {
  logger.log("debug", "Utilities: readExcelSheet started");
  const headings = [];
  let excelData = [];

  const rows = await readXlsxFile(file);

  const firstRow = rows[0];

  firstRow.forEach((item, index) => {
    headings.push({
      Header: item,
      accessor: item
    });
  });

  rows.shift();

  excelData = rows.map((row) => {
    const eachObject = firstRow.reduce((obj, header, i) => {
      // eslint-disable-next-line no-param-reassign
      obj[header] = row[i];
      return obj;
    }, {});

    return eachObject;
  });

  logger.log("debug", "Utilities: readExcelSheet completed");
  return {
    headings,
    excelData
  };
};

export default readExcelSheet;
