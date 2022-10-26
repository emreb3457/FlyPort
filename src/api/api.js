import instance from "../utils/axios";
import { DevExtremeCreateStore } from "../utils/helpers";

export const getProductTable = async (_, page = 0) => {
  return DevExtremeCreateStore("/Urun/BirlesmisTablo");
};

export const getProductList = async (_, page = 0) => {
  return await instance.get("/Urun/BirlesmisListele").then((res) => res.data);
};

export const getProduct = async (_, id) => {
  return await instance
    .get("/Urun/SayfaBilgileriniBul/" + id)
    .then((res) => res.data);
};
export const getProductInsert = async (_, body) => {
  return await instance
    .post("/Urun/SayfaKaydet", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const getProductRemove = async (_, id) => {
  return await instance.get("/Urun/Sil?id=" + id).then((res) => res.data);
};

//
export const getDemandTable = async (_, page = 0) => {
  return DevExtremeCreateStore("/Talep/BirlesmisTablo");
};

export const getDemandList = async (_, page = 0) => {
  return await instance.get("/Talep/BirlesmisListele").then((res) => res.data);
};

export const getDemand = async (_, id) => {
  return await instance
    .get("/Talep/SayfaBilgileriniBul/" + id)
    .then((res) => res.data);
};
export const getDemandInsert = async (_, body) => {
  return await instance
    .post("/Talep/SayfaKaydet", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const getDemandRemove = async (_, id) => {
  return await instance.get("/Talep/Sil?id=" + id).then((res) => res.data);
};

//

export const getCompanyTable = async (_, page = 0) => {
  return DevExtremeCreateStore("/Firma/BirlesmisTablo");
};

export const getCompanyList = async (_, page = 0) => {
  return await instance.get("/Firma/BirlesmisTablo").then((res) => res.data);
};

export const getCompany = async (_, id) => {
  return await instance
    .get("/Firma/SayfaBilgileri/" + id)
    .then((res) => res.data);
};
export const getCompanyInsert = async (_, body) => {
  return await instance
    .post("/Firma/SayfaKaydet", body, {})
    .then((res) => res.data);
};

export const getCompanyUpdate = async (_, body) => {
  return await instance
    .post("/Firma/Guncelle", body, {})
    .then((res) => res.data);
};

export const getCompanyRemove = async (_, id) => {
  return await instance.get("/Firma/Sil?id=" + id).then((res) => res.data);
};

//company adress

export const getCompanyAdressTable = async (_, page = 0, rowCount = 10) => {
  return DevExtremeCreateStore("/FirmaAdres/SayfaliTablo");
};

export const getCompanyAdressList = async (_, page = 0, rowCount = 10) => {
  return await instance
    .get("/FirmaAdres/SayfaliListele")
    .then((res) => res.data);
};

export const getCompanyAdress = async (_, id) => {
  return await instance.get("/FirmaAdres/Bul/" + id).then((res) => res.data);
};

export const getCompanyAdressInsert = async (_, body) => {
  return await instance.post("/FirmaAdres/Ekle", body).then((res) => res.data);
};

export const getCompanyAdressUpdate = async (_, body) => {
  return await instance
    .post("/FirmaAdres/Guncelle", body)
    .then((res) => res.data);
};

export const getCompanyAdressRemove = async (_, id) => {
  return await instance.get("/FirmaAdres/Sil?id=" + id).then((res) => res.data);
};
