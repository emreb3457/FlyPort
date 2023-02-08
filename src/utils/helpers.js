import { createStore } from "devextreme-aspnet-data-nojquery";
import { toast } from "react-toastify";
import { baseApi } from "../config/config";
import { errorMessageWrite } from "./errorMessageWrite";

export const getObjectLength = (object) => {
  return Object.keys(object).length;
};

export const sendRequest = async (api) => {
  return await api
    .then((response) => {
      toast(response?.message || "Başarılı", {
        type: "success",
      });
      return { status: true, response };
    })
    .catch((error) => {
      toast.error(errorMessageWrite(error));
      return { status: false };
    })
    .finally(() => {
      return { status: false };
    });
};

export const arrayParse = (data) => {
  const array = [];
  data?.map((x) => array.push(JSON.parse(x)));
  return array;
};

export const arrayStringify = (data) => {
  const array = [];
  data?.map((x) => array.push(JSON.stringify(x)));
  return array;
};

export const selectNitelikDeger = (...props) => {
  return function (obj) {
    let newObj = Number;
    props.forEach((name) => {
      newObj = obj[name];
    });

    return newObj;
  };
};

export const DevExtremeCreateStore = (url) => {
  return createStore({
    key: "id",
    loadUrl: `${baseApi + "api/v1" + url}`,
    onBeforeSend: (method, ajaxOptions) => {
      ajaxOptions.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      };
    },
  });
};

export const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const removeToken = () => {
  return sessionStorage.removeItem("accessToken");
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  const formatDate = newDate.toISOString().split("T")[0];
  return formatDate;
};

export const stringToBoolean = (string) => {
  const isTrueSet = string === "true";
  return isTrueSet;
};

export const updateArrayState = (setState, index, e) => {
  setState((prev) => [
    ...prev.slice(0, index),
    {
      ...prev[index],
      [e?.target?.name || e.name]: e?.target?.value || e.value,
    },
    ...prev.slice(index + 1),
  ]);
};
