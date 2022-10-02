import * as yup from "yup";

const validations = yup.object().shape({
    email: yup
        .string()
        .email("Geçerli bir email girin.")
        .required("Zorunlu alan."),
    password: yup
        .string()
        .min(0, "Parolanız en az 6 karakter olmalıdır.")
        .required("Zorunlu alan."),
});

export default validations;