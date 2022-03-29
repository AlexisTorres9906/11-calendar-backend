const luxon = require("luxon");

const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }
  const fecha = luxon.DateTime.fromMillis(value);
  if (fecha.isValid) {
    return true;
  }
  return false;
};

module.exports = {
  isDate,
};
