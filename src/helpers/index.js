/* eslint-disable no-prototype-builtins */
import i18n from "../Translation";
import i18next from "i18next";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const changeHtmlDirection = (lang = "ar") => {
  dayjs.extend(localizedFormat);

  if (lang === "ar") {
    localStorage.setItem("lang", "ar");
    i18n.changeLanguage("ar");
    document.dir = "rtl";
    document.documentElement.style.setProperty("--direction", "rtl");
    dayjs.locale("ar-sa");
  } else {
    localStorage.setItem("lang", "en");
    i18n.changeLanguage("en");
    document.dir = "ltr";
    document.documentElement.style.setProperty("--direction", "ltr");
    dayjs.locale("en-gb");
  }
};


export const autoMapper = (obj) => {
  dayjs.locale(i18next.language);

  let result = {
    ...obj,
    to: dayjs(obj?.startDate).format("hh:mm"),
    from: dayjs(obj?.endDate).format("hh:mm"),
    date: dayjs(obj?.startDate).format("dddd, MMMM D, YYYY"),
  };
  for (let key in result) {
    const newKey = key.slice(0, key.length - 1);

    if (key.endsWith("E") && i18next.language === "en") {
      if (!obj[key]) {
        result = {
          ...result
        };
      } else {
        result = { ...result, [newKey]: obj[key] };
      }
    }
    if (key.endsWith("A") && i18next.language === "ar") {
      if (!obj[key]) {
        // result = { ...result, [newKey]: obj[newKey + "E"] };

        result = {
          ...result,
        };
      } else {
        result = { ...result, [newKey]: obj[key] };
      }
    }
  }
  return result;
};

export const langSwitching = (lang, ar, en) => {
  if (lang === "ar") return ar;
  else return en ?? ar;
};
