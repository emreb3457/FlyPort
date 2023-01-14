import * as yup from "yup";

export const loginValidate = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email girin.")
    .required("Zorunlu alan."),
  password: yup
    .string()
    .min(0, "Parolanız en az 6 karakter olmalıdır.")
    .required("Zorunlu alan."),
});

export const countryValidate = yup.object().shape({
  adTurkce: yup.string().required("Zorunlu alan."),
  adOrjinal: yup.string().required("Zorunlu alan."),
  adIngilizce: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const cityValidate = yup.object().shape({
  adTurkce: yup.string().required("Zorunlu alan."),
  adOrjinal: yup.string().required("Zorunlu alan."),
  adIngilizce: yup.string().required("Zorunlu alan."),
  ulkeId: yup.number().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const districtValidate = yup.object().shape({
  adTurkce: yup.string().required("Zorunlu alan."),
  adOrjinal: yup.string().required("Zorunlu alan."),
  adIngilizce: yup.string().required("Zorunlu alan."),
  sehirId: yup.number().required("Zorunlu alan."),
  ulkeId: yup.number().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const UnitTypeValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const AdressTypeValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const CurrencyTypeValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const DeliveryTypeValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const TransportTypeValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const ProductPropertyValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const ProductPropertyValueValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
  nitelikId: yup.number().required("Zorunlu alan."),
});

export const PublicCategoryValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
});

export const ChildrenCategoryValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
  anaKategoriId: yup.number().required("Zorunlu alan."),
});

export const CategoryValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  aciklama: yup.string(),
  altKategoriId: yup.number().required("Zorunlu alan."),
});

///

export const newProductValidate = yup.object().shape({
  UrunAdi: yup.string().required("Zorunlu alan."),
  KisaAdi: yup.string(),
  GTip: yup.string(),
  aciklama: yup.string(),
  GenelKategoriId: yup.number().required("Zorunlu alan."),
  AltKategoriId: yup.number().required("Zorunlu alan."),
  FlyKategoriId: yup.number().required("Zorunlu alan."),
  TeknikOzellikDegerleri: yup.array().required("Zorunlu alan"),
});

export const newDemandValidate = yup.object().shape({
  musteriId: yup.number().required("Zorunlu alan."),
  yetkiliId: yup.number().required("Zorunlu alan."),
  talepTuru: yup.number().required("Zorunlu alan."),
  istenilenUlkeId: yup.number().required("Zorunlu alan."),
  varisUlkesiId: yup.number().required("Zorunlu alan."),
  talepTarihi: "",
});

export const newDemandProductValidate = yup.object().shape({
  TalepId: yup.number().required("Zorunlu alan."),
  Islenilen: yup.number().required("Zorunlu alan."),
  NerdenId: yup.number().required("Zorunlu alan."),
  NereyeId: yup.number().required("Zorunlu alan."),
  TeslimSekliId: yup.number().required("Zorunlu alan."),
  Miktar: yup.string().required("Zorunlu alan."),
  KategoriId: yup.number().required("Zorunlu alan."),
  UrunId: yup.number().required("Zorunlu alan."),
  MusteriId: yup.number().required("Zorunlu alan."),
  TalepEden: yup.string().required("Zorunlu alan."),
  Email: yup.string().required("Zorunlu alan."),
  Telefon: yup.string().required("Zorunlu alan."),
  TeknikOzellikDegerleri: yup.array().required("Zorunlu alan"),
});

export const newCompanyValidate = yup.object().shape({
  FirmaUnvani: yup.string().required("Zorunlu alan."),
  KisaAd: yup.string().required("Zorunlu alan."),
  UlkeId: yup.number().required("Zorunlu alan."),
  SehirId: yup.number().required("Zorunlu alan."),
  Adres: yup.string().required("Zorunlu alan."),
  PostaKodu: yup.string().required("Zorunlu alan."),
  AcikAdresi: yup.string().required("Zorunlu alan."),
  VergiDairesi: yup.string().required("Zorunlu alan."),
  VergiNo: yup.string().required("Zorunlu alan."),
  Sektoru: yup.string().required("Zorunlu alan."),
});

export const newCompanyAdressValidate = yup.object().shape({
  adresTipiId: yup.number().required("Zorunlu alan."),
  adres: yup.string().required("Zorunlu alan."),
  ulkeId: yup.number().required("Zorunlu alan."),
  sehirId: yup.number().required("Zorunlu alan."),
  ilceId: yup.number().required("Zorunlu alan."),
  yetkiliAd: yup.string().required("Zorunlu alan."),
  yetkiliSoyad: yup.string().required("Zorunlu alan."),
  yetkiliEmail: yup.string().required("Zorunlu alan."),
  yetkiliIletisim: yup.string().required("Zorunlu alan."),
});

export const newCompanyOfficialValidate = yup.object().shape({
  ad: yup.string().required("Zorunlu alan."),
  soyad: yup.string().required("Zorunlu alan."),
  gorev: yup.string().required("Zorunlu alan."),
  email: yup.string().required("Zorunlu alan."),
  gsm: yup.string().required("Zorunlu alan."),
  weChat: yup.string().nullable(),
  digerIletisim: yup.string().nullable(),
});

export const newPriceResearch = yup.object().shape({
  ureticiFirmaId: yup.number().required("Zorunlu alan."),
  istenilenUrunAynisiMi: yup.boolean().required("Zorunlu alan."),
  ureticininBulunduguUlkeId: yup.number().required("Zorunlu alan."),
  ureticininBulunduguSehirId: yup.number().required("Zorunlu alan."),
  teslimSekliId: yup.number().required("Zorunlu alan."),
  ucretlendirmeyeEsasMiktarBirimiId: yup.number().required("Zorunlu alan."),
  hazirOlanMiktar: yup.string().required("Zorunlu alan."),
  miktarBirimiId: yup.number().required("Zorunlu alan."),
  istenikenMiktarIcinHazirlikSuresi: yup.string().required("Zorunlu alan."),
  birimFiyati: yup.string().required("Zorunlu alan."),
  dovizCinsi: yup.string().required("Zorunlu alan."),
  teklifGecerlilikTarihi: yup.string().required("Zorunlu alan."),
  aciklama: yup.string().required("Zorunlu alan."),
});

export const newLogistics = yup.object().shape({
  teklifUrunId: yup.number().required("Zorunlu alan."),
  tasiyiciFirma: yup.string().required("Zorunlu alan."),
  yetkiliKisi: yup.string().required("Zorunlu alan."),
  teklifAlanKisi: yup.string().required("Zorunlu alan."),
  yuklemeYeri: yup.string().required("Zorunlu alan."),
  teslimYeri: yup.string().required("Zorunlu alan."),
  tasimaTipiId: yup.number().required("Zorunlu alan."),
  tasimaStatusu: yup.string().required("Zorunlu alan."),
  tasimaMiktari: yup.string().required("Zorunlu alan."),
  aracTipi: yup.string().required("Zorunlu alan."),
  toplamTutar: yup.number().required("Zorunlu alan."),
  dovizCinsiId: yup.number().required("Zorunlu alan."),
  gecerlilikTarihi: yup.string().required("Zorunlu alan."),
});

export const newCustom = yup.object().shape({
  menseiUlkeId: yup.number().required("Zorunlu alan."),
  cikisUlkeId: yup.number().required("Zorunlu alan."),
  varisUlkeId: yup.number().required("Zorunlu alan."),
  gTipNo: yup.string().required("Zorunlu alan."),
  gTipNoAciklama: yup.string().required("Zorunlu alan."),
  gozetimTuru: yup.string().required("Zorunlu alan."),
  kgGozetimOrani: yup.number().required("Zorunlu alan."),
  gumrukVergisiOrani: yup.number().required("Zorunlu alan."),
  igvOrani: yup.number().required("Zorunlu alan."),
  dampingTuru: yup.string().required("Zorunlu alan."),
  dampingOrani: yup.number().required("Zorunlu alan."),
  otvOrani: yup.number().required("Zorunlu alan."),
  kdvOrani: yup.number().required("Zorunlu alan."),
  tarexIsteniyorMu: yup.string().required("Zorunlu alan."),
  tarimIsteniyorMu: yup.string().required("Zorunlu alan."),
  ihtisasGumruguVarMi: yup.string().required("Zorunlu alan."),
  teklifUrunId: yup.number().required("Zorunlu alan."),
});

export const otherCosts = yup.object().shape({
  teklifUrunId: yup.number().required("Zorunlu alan."),
  islemYapan: yup.string().required("Zorunlu alan."),
  tedarikciFirmaId: yup.number().required("Zorunlu alan."),
  ozelKod: yup.string().required("Zorunlu alan."),
  giderTipi: yup.string().required("Zorunlu alan."),
  giderTuru: yup.string().required("Zorunlu alan."),
  birimFiyat: yup.number().required("Zorunlu alan."),
  dovizCinsiId: yup.number().required("Zorunlu alan."),
  kdvOrani: yup.number().required("Zorunlu alan."),
  kdvDahilTutari: yup.number().required("Zorunlu alan."),
  toplamMaliyetUSD: yup.number().required("Zorunlu alan."),
  gecerlilikTarihi: yup.string().required("Zorunlu alan."),
});
