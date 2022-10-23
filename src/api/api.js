import instance from "../utils/axios";
import { DevExtremeCreateStore } from "../utils/helpers";

export const getProductList = async (_, page = 0) => {
  return DevExtremeCreateStore("/Urun/SayfaliListele");
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
export const getDemandList = async (_, page = 0) => {
  return DevExtremeCreateStore("/Talep/SayfaliListele");
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

export const getCompanyList = async (_, page = 0) => {
  return DevExtremeCreateStore("/Firma/SayfaliListele");
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

export const getCompanyRemove = async (_, id) => {
  return await instance.get("/Firma/Sil?id=" + id).then((res) => res.data);
};
