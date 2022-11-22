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

////////////////////////////////////////////////////////////////////////
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
    .post("/Talep/SayfaKaydet", body)
    .then((res) => res.data);
};

export const getDemandRemove = async (_, id) => {
  return await instance.get("/Talep/Sil?id=" + id).then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////
export const getAlternativeDemandTable = async (_, id) => {
  return DevExtremeCreateStore("/Talep/AlternatifListele/" + id);
};

export const getAlternativeDemandList = async (_, page = 0) => {
  return await instance.get("/Talep/BirlesmisListele").then((res) => res.data);
};

export const getAlternativeDemand = async (_, id) => {
  return await instance.get("/Talep/IstenenUrun/" + id).then((res) => res.data);
};
export const getAlternativeDemandInsert = async (_, body) => {
  return await instance
    .post("/Talep/AlternatifEkle", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const getAlternativeDemandRemove = async (_, id) => {
  return await instance.get("/Talep/Sil?id=" + id).then((res) => res.data);
};
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
export const getDemandProductTable = async (_, page = 0) => {
  return DevExtremeCreateStore("/TalepUrun/BirlesmisTablo");
};

export const getDemandProductList = async (_, page = 0) => {
  return await instance
    .get("/TalepUrun/BirlesmisListele")
    .then((res) => res.data);
};

export const getDemandProduct = async (_, id) => {
  return await instance
    .get("/TalepUrun/SayfaBilgileriniBul/" + id)
    .then((res) => res.data);
};
export const getDemandProductInsert = async (_, body) => {
  return await instance
    .post("/Talep/UrunKaydet", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const getDemandProductRemove = async (_, id) => {
  return await instance.get("/TalepUrun/Sil?id=" + id).then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////company adress

export const getCompanyAdressTable = async (_, id) => {
  return DevExtremeCreateStore("/FirmaAdres/BirlesmisTablo/" + id);
};

export const getCompanyAdressList = async (_, id) => {
  return await instance
    .get("/FirmaAdres/SayfaliListele/" + id)
    .then((res) => res.data);
};

export const getCompanyAdress = async (_, id) => {
  return await instance.get("/FirmaAdres/Bul/" + id).then((res) => res.data);
};

export const getCompanyAdressInsert = async (_, body) => {
  return await instance
    .post("/FirmaAdres/SayfaKaydet", body)
    .then((res) => res.data);
};

export const getCompanyAdressUpdate = async (_, body) => {
  return await instance
    .post("/FirmaAdres/Guncelle", body)
    .then((res) => res.data);
};

export const getCompanyAdressRemove = async (_, id) => {
  return await instance.get("/FirmaAdres/Sil?id=" + id).then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////Company Official

export const getCompanyOfficialTable = async (_, id) => {
  return DevExtremeCreateStore("/FirmaYetkili/BirlesmisTablo/" + id);
};

export const getCompanyOfficialList = async (_, page = 0, rowCount = 10) => {
  return await instance
    .get("/FirmaYetkili/SayfaliListele")
    .then((res) => res.data);
};

export const getCompanyOfficial = async (_, id) => {
  return await instance.get("/FirmaYetkili/Bul/" + id).then((res) => res.data);
};

export const getCompanyOfficialInsert = async (_, body) => {
  return await instance
    .post("/FirmaYetkili/SayfaKaydet", body)
    .then((res) => res.data);
};

export const getCompanyOfficialRemove = async (_, id) => {
  return await instance
    .get("/FirmaYetkili/Sil?id=" + id)
    .then((res) => res.data);
};

////////////////////////////////////////

////////////////////////////////////////////////////////////////////////Company Official
export const getPriceResearchTable = async (_, id) => {
  return DevExtremeCreateStore("/Teklif/BirlesmisTablo");
};

export const getPriceResearchList = async (_, page = 0, rowCount = 10) => {
  return await instance.get("/Teklif/SayfaliListele").then((res) => res.data);
};

export const getPriceResearchInsert = async (_, body) => {
  return await instance
    .post("/Teklif/SayfaKaydet", body)
    .then((res) => res.data);
};

export const getPriceResearchRemove = async (_, id) => {
  return await instance.get("/Teklif/Sil?id=" + id).then((res) => res.data);
};
