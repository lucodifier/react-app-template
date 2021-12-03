export const toCurrency = (value) => {
  if (value) {
    try {
      value = value.toString().replace(".", "");
      value = value.toString().replace(",", "");
      value =
        value.toString().substring(0, value.toString().length - 2) +
        "." +
        value.toString().substring(value.toString().length - 2);

      if (
        value.split(".")[0] == "00" ||
        value.split(".")[0] == "000" ||
        value.split(".")[0] == "0000" ||
        value.split(".")[0] == "00000"
      )
        return "R$ " + value.toString().replace(".", ",");

      return Number(value).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return "";
};

export const toCurrencyNumber = (value) => {
  if (value) {
    try {
      value =
        value.toString().substring(0, value.toString().length - 2) +
        "." +
        value.toString().substring(value.toString().length - 2);

      if (
        value.split(".")[0] == "00" ||
        value.split(".")[0] == "000" ||
        value.split(".")[0] == "0000" ||
        value.split(".")[0] == "00000"
      )
        return value;

      return Number(value);
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return "";
};

export const toCurrencyDecimal = (value) => {
  if (value && value != "0") {
    try {
      value =
        value.toString().substring(0, value.toString().length - 2) +
        "," +
        value.toString().substring(value.toString().length - 2);

      return value;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return "";
};

export const toDate = (value) => {
  try {
    return new Date(value).toLocaleDateString("pt-BR");
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const toDecimalInt = (value) => {
  if (value) {
    debugger;
    var decimals = value.toString().split(".");

    if (decimals.length > 1) {
      var initial = decimals[0];
      var end = decimals[1];
      if (decimals[1].length == 1) {
        end = decimals[1] + "0";
      }

      return `${initial}${end}`;
    } else {
      return value + "00";
    }
  }

  return 0;
};
