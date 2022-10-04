import instance from "../utils/axios";
import { errorMessageWrite } from "../utils/errorMessageWrite";

//Country Api - Start
export const getCountryList = async (_, page) => {
  return await instance
    .get("/Ulke/SayfaliListele?page=" + page)
    .then((res) => res.data);
};

export const getCountry = async (_, id) => {
  return await instance.get("/Ulke/Bul/" + id).then((res) => res.data);
};

export const getCountryInsert = async (_, body) => {
  return await instance.post("/Ulke/Ekle", body).then((res) => res.data);
};

export const getCountryUpdate = async (_, body) => {
  return await instance.post("/Ulke/Guncelle", body).then((res) => res.data);
};

export const getCountryRemove = async (_, id) => {
  return await instance.get("/Ulke/Sil").then((res) => res.data);
};
//Country Api - End
