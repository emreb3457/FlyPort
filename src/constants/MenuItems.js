export const menuItems = [
  {
    title: "Firmalar",
    route: "firmalar",
  },
  // {
  //   title: "Talepler",
  //   route: "talepler",
  // },
  // {
  //   title: "Teklifler",
  //   route: "teklifler",
  // },
  // {
  //   title: "Siparişler",
  //   route: "siparisler",
  // },
  {
    title: "Ürünler",
    route: "urunler",
  },
  {
    title: "Tanımlamalar",
    route: "tanimlamalar",
    submenu: [
      {
        title: "Ülkeler",
        route: "ulkeler",
      },
      {
        title: "Sehirler",
        route: "sehirler",
      },
      {
        title: "İlçeler",
        route: "ilceler",
      },
      {
        title: "Birim Tipi",
        route: "birimtipi",
      },
      {
        title: "Taşıma Tipi",
        route: "tasimatipi",
      },
      {
        title: "Teslimat Tipi",
        route: "teslimattipi",
      },
      {
        title: "Ürün Nitelik",
        route: "nitelik",
      },
      {
        title: "Ürün Nitelik Değer",
        route: "nitelikdeger",
      },
      {
        title: "Genel Kategori",
        route: "genelkategori",
      },
      {
        title: "Alt Kategori",
        route: "altkategori",
      },
      {
        title: "Kategori",
        route: "kategori",
      },
      {
        title: "Adres Tipi",
        route: "adrestipi",
      },
      {
        title: "Döviz Cinsi",
        route: "dovizcinsi",
      },
      {
        title: "GTİP Listesi",
        route: "gtip",
      },
    ],
  },
];

export const DemandMenu = (id) => {
  const menuItems = [
    {
      title: "Ana Sayfa",
      route: "",
    },
    {
      title: "Görevler",
      route: `gorevler/${id}`,
      submenu: [
        {
          title: "F.Araştırma",
          route: "fiyatarastirma",
        },
        {
          title: "Lojistik",
          route: "lojistik",
        },
        {
          title: "Gümrükleme",
          route: "gumrukleme",
        },
      ],
    },
    {
      title: "Maliyetler",
      route: `maliyetler/${id}`,
    },
    {
      title: "Teklif",
      route: `teklif/${id}`,
    },
  ];

  return menuItems;
};

export const ProductMenu = (id) => {
  const menuItems = [
    {
      title: "Ana Sayfa",
      route: "",
    },
    {
      title: "Ürün Bilgileri",
      route: `urunler/${id}`,
    },
    {
      title: "Maliyetleri",
      route: `urun-maliyet/${id}`,
      submenu: [
        {
          title: "Üretici Fiyatları",
          route: "uretici-fiyat",
        },
        {
          title: "Lojistik",
          route: "lojistik-maliyet",
        },
        {
          title: "Gümrükleme",
          route: "gumruk-maliyet",
        },
        {
          title: "Maliyet Analizi",
          route: "maliyet-analizi",
        },
      ],
    },
  ];

  return menuItems;
};
