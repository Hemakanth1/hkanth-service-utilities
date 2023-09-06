const csvToJson = (string, delimiter = ",") => {
  const headings = string
    .slice(0, string.indexOf("\n"))
    .split(delimiter)
    .map((x) => x.replace("\r", ""));

  const rows = string.slice(string.indexOf("\n") + 1).split("\n");

  rows.pop();

  const data = rows.map((row) => {
    const values = row.split(delimiter);

    const eachObject = headings.reduce((obj, header, i) => {
      // eslint-disable-next-line no-param-reassign
      obj[header] = values[i].toString().replace("\r", "");
      return obj;
    }, {});

    return eachObject;
  });

  return { headings, data };
};

export default csvToJson;
