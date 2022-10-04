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
  adIng: yup.string().required("Zorunlu alan."),
  aciklama: yup.string().required("Zorunlu alan."),
});
