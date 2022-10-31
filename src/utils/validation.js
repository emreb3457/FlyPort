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

export const DeliveryTypeValidate = yup.object().shape({
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
  weChat: yup.string(),
  digerIletisim: yup.string(),
});
