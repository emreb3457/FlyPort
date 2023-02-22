import query from "devextreme/data/query";
import instance from "../utils/axios";
import { DevExtremeCreateStore } from "../utils/helpers";

export const keywordTable = async (_, page = 0) => {
  return DevExtremeCreateStore("/UrunAnahtarKelime/BirlesmisTablo");
};

export const keywordList = async (_, id) => {
  return await instance
    .get("/UrunAnahtarKelime/BirlesmisListele?UrunId=" + id)
    .then((res) => res.data);
};

export const keywordDetail = async (_, id) => {
  return await instance
    .get("/UrunAnahtarKelime/SayfaBilgileriniBul/" + id)
    .then((res) => res.data);
};
export const keywordInsert = async (_, body) => {
  return await instance
    .post("/UrunAnahtarKelime/Ekle", body)
    .then((res) => res.data);
};

export const keyword = async (_, id) => {
  return await instance
    .get("/UrunAnahtarKelime/Sil?id=" + id)
    .then((res) => res.data);
};

////////////////////////
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
  return await instance.post("/Talep/UrunKaydet", body).then((res) => res.data);
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
  return DevExtremeCreateStore("/Teklif/BirlesmisTablo?teklifId=" + id);
};

export const getPriceResearchList = async (_, page = 0, rowCount = 10) => {
  return await instance.get("/Teklif/SayfaliListele").then((res) => res.data);
};

export const getPriceResearch = async (_, id) => {
  return await instance
    .get("/Teklif/SayfaBilgileriniBul/" + id)
    .then((res) => res.data);
};

export const getPriceResearchInsert = async (_, body) => {
  return await instance
    .post("/Teklif/SayfaKaydet", body)
    .then((res) => res.data);
};

export const getPriceResearchUpdate = async (_, body) => {
  return await instance
    .post("/Teklif/SayfaKaydet", body)
    .then((res) => res.data);
};

export const getPriceResearchRemove = async (_, id) => {
  return await instance.get("/Teklif/Sil?id=" + id).then((res) => res.data);
};

export const getMatchingProduct = async (_, id) => {
  return await instance.get("/Talep/EslesenUrun/" + id).then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////Company Official

export const getShippingTable = async (_, id) => {
  return DevExtremeCreateStore("/Kargo/SayfaliTablo/" + id);
};

export const getShippingList = async (_, page = 0, rowCount = 10) => {
  return await instance.get("/Kargo/SayfaliListele").then((res) => res.data);
};

export const getShipping = async (_, id) => {
  return await instance
    .get("/Kargo/BulByTeklifId/" + id)
    .then((res) => res.data);
};

export const shippingInsert = async (_, body) => {
  return await instance.post("/Kargo/Ekle", body).then((res) => res.data);
};

export const shippingRemove = async (_, id) => {
  return await instance.get("/Kargo/Sil?id=" + id).then((res) => res.data);
};

///////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////Company Official

export const getLogisticsTable = async (_, id) => {
  return DevExtremeCreateStore(
    "/TeklifMaliyet/BirlesmisTablo?teklifurunid=" + id
  );
};

export const getLogisticList = async (_) => {
  return await instance
    .get("/TeklifMaliyet/SayfaliListele")
    .then((res) => res.data);
};

export const getLogisticsDetail = async (_, id) => {
  return await instance.get("/TeklifMaliyet/Bul/" + id).then((res) => res.data);
};

export const logisticsInsert = async (_, body) => {
  return await instance
    .post("/TeklifMaliyet/Ekle", body)
    .then((res) => res.data);
};

export const logisticsUpdate = async (_, body) => {
  return await instance
    .post("/TeklifMaliyet/Guncelle", body)
    .then((res) => res.data);
};

export const logisticRemove = async (_, id) => {
  return await instance
    .get("/TeklifMaliyet/Sil?id=" + id)
    .then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////Company Official

export const productLogisticsTable = async (_, id) => {
  return DevExtremeCreateStore("/UrunMaliyet/BirlesmisTablo?urunid=" + id);
};

export const productLogisticList = async (_) => {
  return await instance
    .get("/UrunMaliyet/SayfaliListele")
    .then((res) => res.data);
};

export const productLogisticsDetail = async (_, id) => {
  return await instance.get("/UrunMaliyet/Bul/" + id).then((res) => res.data);
};

export const productLogisticsInsert = async (_, body) => {
  return await instance.post("/UrunMaliyet/Ekle", body).then((res) => res.data);
};

export const productLogisticsUpdate = async (_, body) => {
  return await instance
    .post("/UrunMaliyet/Guncelle", body)
    .then((res) => res.data);
};

export const productLogisticRemove = async (_, id) => {
  return await instance
    .get("/UrunMaliyet/Sil?id=" + id)
    .then((res) => res.data);
};
////////////////////////////////////////
////////////////////////////////////////////////////////////////////////Gtip

export const getGtipTable = async (_, id) => {
  return DevExtremeCreateStore("/GTipTanim/BirlesmisTablo");
};

export const getGtipList = async (_, page = 0, rowCount = 10) => {
  return await instance
    .get("/GTipTanim/BirlesmisListele")
    .then((res) => res.data);
};

export const getGtip = async (_, id) => {
  return await instance.get("/GTipTanim/Bul/" + id).then((res) => res.data);
};

export const getGtipInsert = async (_, body) => {
  return await instance.post("/GTipTanim/Ekle", body).then((res) => res.data);
};

export const gtipUpdate = async (_, body) => {
  return await instance
    .post("/GTipTanim/Guncelle", body)
    .then((res) => res.data);
};

export const gtipRemove = async (_, id) => {
  return await instance.get("/GTipTanim/Sil?id=" + id).then((res) => res.data);
};

///////////////////////////////////////////////////////////////////////

export const getCustomTable = async (_, id) => {
  return DevExtremeCreateStore(
    "/TeklifGumruk/BirlesmisTablo?teklifurunid=" + id
  );
};

export const getCustomList = async (_) => {
  return await instance
    .get("/TeklifGumruk/SayfaliListele")
    .then((res) => res.data);
};

export const getCustomDetail = async (_, id) => {
  return await instance.get("/TeklifGumruk/Bul/" + id).then((res) => res.data);
};

export const customInsert = async (_, body) => {
  return await instance
    .post("/TeklifGumruk/Ekle", body)
    .then((res) => res.data);
};

export const customUpdate = async (_, body) => {
  return await instance
    .post("/TeklifGumruk/Guncelle", body)
    .then((res) => res.data);
};

export const customRemove = async (_, id) => {
  return await instance
    .get("/TeklifGumruk/Sil?id=" + id)
    .then((res) => res.data);
};

////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

export const getCustomCifTable = async (_, id) => {
  return DevExtremeCreateStore(
    "/TeklifCifMaliyet/BirlesmisTablo?teklifUrunId=" + id
  );
};

export const getCustomCifList = async (_) => {
  return await instance
    .get("/TeklifCifMaliyet/SayfaliListele")
    .then((res) => res.data);
};

export const getCustomCifDetail = async (_, id) => {
  return await instance
    .get("/TeklifCifMaliyet/BulByGumrukId/" + id)
    .then((res) => res.data);
};

export const customCifInsert = async (_, body) => {
  return await instance
    .post("/TeklifCifMaliyet/Ekle", body)
    .then((res) => res.data);
};

export const customCifUpdate = async (_, body) => {
  return await instance
    .post("/TeklifCifMaliyet/Guncelle", body)
    .then((res) => res.data);
};

export const customCifRemove = async (_, id) => {
  return await instance
    .get("/TeklifCifMaliyet/Sil?id=" + id)
    .then((res) => res.data);
};

////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

export const otherCostsTable = async (_, id) => {
  return DevExtremeCreateStore(
    "/TeklifDigerMaliyetler/BirlesmisTablo?teklifUrunId=" + id
  );
};

export const otherCostsList = async (_) => {
  return await instance
    .get("/TeklifDigerMaliyetler/SayfaliListele")
    .then((res) => res.data);
};

export const otherCostsDetail = async (_, id) => {
  return await instance
    .get("/TeklifDigerMaliyetler/Bul/" + id)
    .then((res) => res.data);
};

export const otherCostsInsert = async (_, body) => {
  return await instance
    .post("/TeklifDigerMaliyetler/Ekle", body)
    .then((res) => res.data);
};

export const otherCostsUpdate = async (_, body) => {
  return await instance
    .post("/TeklifDigerMaliyetler/Guncelle", body)
    .then((res) => res.data);
};

export const otherCostsRemove = async (_, id) => {
  return await instance
    .get("/TeklifDigerMaliyetler/Sil?id=" + id)
    .then((res) => res.data);
};

////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

export const offerTable = async (_, id) => {
  return DevExtremeCreateStore("/TeklifMaster/BuTalepIcin?teklifUrunId=" + id);
};

export const offerList = async (_) => {
  return await instance
    .get("/TeklifMaster/SayfaliListele")
    .then((res) => res.data);
};

export const offerDetail = async (_, id) => {
  return await instance.get("/TeklifMaster/Bul/" + id).then((res) => res.data);
};

export const offerInsert = async (_, body) => {
  return await instance
    .post("/TeklifMaster/Ekle", body)
    .then((res) => res.data);
};

export const offerUpdate = async (_, body) => {
  return await instance
    .post("/TeklifMaster/Guncelle", body)
    .then((res) => res.data);
};

export const offerRemove = async (_, id) => {
  return await instance
    .get("/TeklifMaster/Sil?id=" + id)
    .then((res) => res.data);
};

///////////////////////////////////////////////////////////////////////

export const productOfferTable = async (_, id) => {
  return DevExtremeCreateStore("/UrunMaster/BuTalepIcin?urunid=" + id);
};

export const productOfferList = async (_) => {
  return await instance
    .get("/UrunMaster/SayfaliListele")
    .then((res) => res.data);
};

export const productOfferDetail = async (_, id) => {
  return await instance.get("/UrunMaster/Bul/" + id).then((res) => res.data);
};

export const productOfferInsert = async (_, body) => {
  return await instance.post("/UrunMaster/Ekle", body).then((res) => res.data);
};

export const productOfferUpdate = async (_, body) => {
  return await instance
    .post("/UrunMaster/Guncelle", body)
    .then((res) => res.data);
};

export const productOfferRemove = async (_, id) => {
  return await instance.get("/UrunMaster/Sil?id=" + id).then((res) => res.data);
};
///////////////////////////////////////////////////////////////////////

export const productCertificatesTable = async (_, id) => {
  return DevExtremeCreateStore("/Sertifika/SertifikaGetir?urunId=" + id);
};

export const productCertificatesList = async (_) => {
  return await instance
    .get("/Sertifika/SayfaliListele")
    .then((res) => res.data);
};

export const productCertificatesDetail = async (_, id) => {
  return await instance.get("/Sertifika/Bul/" + id).then((res) => res.data);
};

export const productCertificatesInsert = async (_, body) => {
  return await instance
    .post("/Sertifika/SertifikaKaydet", body)
    .then((res) => res.data);
};

export const productCertificatesUpdate = async (_, body) => {
  return await instance
    .post("/Sertifika/Guncelle", body)
    .then((res) => res.data);
};

export const productCertificatesRemove = async (_, id) => {
  return await instance.get("/Sertifika/Sil?id=" + id).then((res) => res.data);
};

///////////////////////////////////////////////////////////////////////

export const productPriceTable = async (_, id, ulkeId) => {
  return DevExtremeCreateStore(
    "/UrunFiyat/SayfaBilgileriniBulUrunAndMenseiId?urunId=" +
      id +
      "&menseiUlkeId=" +
      ulkeId
  );
};

export const productPriceList = async (_) => {
  return await instance
    .get("/UrunFiyat/SayfaliListele")
    .then((res) => res.data);
};

export const productPriceDetail = async (_, id) => {
  return await instance.get("/UrunFiyat/Bul/" + id).then((res) => res.data);
};

export const productPriceInsert = async (_, body) => {
  return await instance
    .post("/UrunFiyat/SayfaKaydet", body)
    .then((res) => res.data);
};

export const productPriceUpdate = async (_, body) => {
  return await instance
    .post("/UrunFiyat/Guncelle", body)
    .then((res) => res.data);
};

export const productPriceRemove = async (_, id) => {
  return await instance.get("/UrunFiyat/Sil?id=" + id).then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////Gtip

export const productCustomsTable = async (_, id) => {
  return DevExtremeCreateStore("/UrunGumruk/BirlesmisTablo?urunId=" + id);
};

export const productCustomsList = async (_) => {
  return await instance
    .get("/UrunGumruk/BirlesmisListele")
    .then((res) => res.data);
};

export const productCustoms = async (_, id) => {
  return await instance.get("/UrunGumruk/Bul/" + id).then((res) => res.data);
};

export const productCustomsInsert = async (_, body) => {
  return await instance.post("/UrunGumruk/Ekle", body).then((res) => res.data);
};

export const productCustomsUpdate = async (_, body) => {
  return await instance
    .post("/UrunGumruk/Guncelle", body)
    .then((res) => res.data);
};

export const productCustomsRemove = async (_, id) => {
  return await instance.get("/UrunGumruk/Sil?id=" + id).then((res) => res.data);
};

////////////////////////////////////////////////////////////////////////Company Official

export const productCargoTable = async (_, id) => {
  return DevExtremeCreateStore("/Kargo/SayfaliTablo/" + id);
};

export const productCargoList = async (_, page = 0, rowCount = 10) => {
  return await instance.get("/Kargo/SayfaliListele").then((res) => res.data);
};

export const productCargo = async (_, id) => {
  return await instance
    .get("/Kargo/BulByTeklifId/" + id)
    .then((res) => res.data);
};

export const productCargoByProductId = async (_, id, detayId) => {
  return await instance
    .get("/Kargo/BulByUrunFiyatId/1?urunId= " + id + "&urunFiyatId=" + detayId)
    .then((res) => res.data);
};

export const productCargoInsert = async (_, body) => {
  return await instance
    .post("/Kargo/UrunKargoEKle", body)
    .then((res) => res.data);
};

export const productCargoRemove = async (_, id) => {
  return await instance.get("/Kargo/Sil?id=" + id).then((res) => res.data);
};

///////////////////////////////////////////////////////////////////////
