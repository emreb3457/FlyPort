import instance from "../utils/axios";
import { errorMessageWrite } from "../utils/errorMessageWrite";

export const getCountryList = async (_, page) => {
  console.log(page)
  return await instance
    .get("/api/v1/Ulke/SayfaliListele?page=" + page, {})
    .then((res) => res.data);
};

export const getCountry = async (id) => {
  try {
    const { data } = await instance.get("/Uke/Bul/" + id, {});
  } catch (error) {}
};

export const getCountryInsert = async () => {
  try {
    const { data } = await instance.post("/Uke/Ekle", {});
  } catch (error) {}
};

export const getCountryUpdate = async () => {
  try {
    const { data } = await instance.post("/Uke/Guncelle", {});
  } catch (error) {}
};

export const getCountryRemove = async () => {
  try {
    const { data } = await instance.post("/Uke/Sil", {});
  } catch (error) {}
};
