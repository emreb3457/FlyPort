export const menuItems = [
  {
    title: "Firmalar",
    route: "firmalar",
  },
  {
    title: "Talepler",
    route: "talepler",
    // submenu: [
    //   {
    //     title: "22.Talep",
    //     route: "talep",
    //     submenu: [
    //       {
    //         title: "1.Alternatif",
    //         route: "alternatif",
    //         submenu: [
    //           {
    //             title: "Altarnetif Özeti",
    //             route: "urun",
    //             submenu: [
    //               {
    //                 title: "Görevler",
    //                 route: "gorev",
    //                 submenu: [
    //                   {
    //                     title: "Araştırma",
    //                     route: "asd",
    //                   },
    //                   {
    //                     title: "Lojistik",
    //                     route: "asd",
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //           {
    //             title: "Ürün Listesi",
    //             route: "urunlistesi",
    //             submenu: [
    //               {
    //                 title: "3. Ürün",
    //                 route: "3",
    //                 submenu: [
    //                   {
    //                     title: "Görevler",
    //                     route: "gorevler",
    //                     submenu: [
    //                       {
    //                         title: "F. Araştırma",
    //                         route: "fiyatarastirmalari",
    //                       },
    //                       {
    //                         title: "Lojistik",
    //                         route: "lojistik",
    //                       },
    //                       {
    //                         title: "Gümrükleme",
    //                         route: "gumrukleme",
    //                       },
    //                     ],
    //                   },
    //                   {
    //                     title: "Maliyetler",
    //                     route: "maliyetler",
    //                   },
    //                   {
    //                     title: "Teklif",
    //                     route: "teklifler",
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
  {
    title: "Teklifler",
    route: "teklifler",
  },
  {
    title: "Siparişler",
    route: "siparisler",
  },
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
    ],
  },
];

export const DemandMenu = () => {
  const asd = [
    {
      title: "Görevler",
      route: "gorevler",
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
        {
          title: "Birim Tipi",
          route: "birimtipi",
        },
      ],
    },
    {
      title: "Maliyetler",
      route: "maliyetler",
    },
    {
      title: "Teklif",
      route: "teklif",
    },
  ];

  return asd;
};
