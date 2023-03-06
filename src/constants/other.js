export const uzunlukBirim = [
  { id: "cm", value: "CM" },
  { id: "m", value: "M" },
  { id: "mm", value: "MM" },
];

export const agirlikBirim = [
  { id: "gr", value: "GR" },
  { id: "kg", value: "KG" },
  { id: "ton", value: "TON" },
];

export const SIDEBAR = [
  {
    key: "firmalar",
    name: "Firmalar",
    path: "/firmalar",
    type: "link",
  },
  {
    key: "urunler",
    name: "Ürünler",
    path: "/urunler",
    type: "link",
  },
  {
    key: "tanimlamalar",
    name: "Tanımlamalar",
    path: "/tanimlamalar",
    type: "submenu",
    children: [
      {
        key: "ulkeler",
        name: "Ülkeler",
        path: "/tanimlamalar/ulkeler",
      },
      {
        key: "sehirler",
        name: "Şehirler",
        path: "/tanimlamalar/sehirler",
      },
      {
        key: "ilceler",
        name: "İlçeler",
        path: "/tanimlamalar/ilceler",
      },
      {
        key: "birim-tipi",
        name: "Birim Tipi",
        path: "/tanimlamalar/birimtipi",
      },
      {
        key: "tasima-tipi",
        name: "Taşıma Tipi",
        path: "/tanimlamalar/tasimatipi",
      },
      {
        key: "teslimat-tipi",
        name: "Teslimat Tipi",
        path: "/tanimlamalar/teslimattipi",
      },
      {
        key: "urun-nitelik",
        name: "Ürün Nitelik",
        path: "/tanimlamalar/nitelik",
      },
      {
        key: "nitelik-deger",
        name: "Nitelik Değer",
        path: "/tanimlamalar/nitelikdeger",
      },
      {
        key: "genel-kategori",
        name: "Genel Kategori",
        path: "/tanimlamalar/genelkategori",
      },
      {
        key: "alt-kategori",
        name: "Alt Kategori",
        path: "/tanimlamalar/altkategori",
      },
      {
        key: "kategori",
        name: "Kategori",
        path: "/tanimlamalar/kategori",
      },
      {
        key: "adres-tipi",
        name: "Adres Tipi",
        path: "/tanimlamalar/adrestipi",
      },
      {
        key: "doviz-cinsi",
        name: "Döviz Cinsi",
        path: "/tanimlamalar/dovizcinsi",
      },
      {
        key: "gtip",
        name: "Gtip",
        path: "/tanimlamalar/gtip",
      },
    ],
  },
];

export const PRODUCT_SIDEBAR = (id) => [
  {
    key: "ana-sayfa",
    name: "Ana Sayfa",
    path: "/urunler",
    type: "link",
  },
  {
    key: "urun-bilgileri",
    name: "Ürün Bilgileri",
    path: `/urun-detay/detay/${id}`,
    type: "link",
  },
  {
    key: "maliyetleri",
    name: "Maliyetleri",
    path: "/urun-detay/urun-maliyet",
    type: "submenu",
    children: [
      {
        key: "uretici-fiyat",
        name: "Üretici Fiyatları",
        path: `/urun-detay/urun-maliyet/${id}`,
      },
      {
        key: "lojistik",
        name: "Lojistik",
        path: `/urun-detay/lojistik-maliyet/${id}`,
      },
      // {
      //   key: "gumrukleme",
      //   name: "Gümrükleme",
      //   path: "/urun-detay/gorevler/gumruk-maliyet",
      // },
      // {
      //   key: "maliyet-analizi",
      //   name: "Maliyet Analizi",
      //   path: "/urun-detay/gorevler/maliyet-analizi",
      // },
    ],
  },
  {
    key: "teklif",
    name: "Teklif",
    path: `/urun-detay/teklifler/${id}`,
    type: "link",
  },
];
