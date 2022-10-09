import * as yup from 'yup';

export const loginValidate = yup.object().shape({
	email: yup
		.string()
		.email('Geçerli bir email girin.')
		.required('Zorunlu alan.'),
	password: yup
		.string()
		.min(0, 'Parolanız en az 6 karakter olmalıdır.')
		.required('Zorunlu alan.'),
});

export const countryValidate = yup.object().shape({
	adTurkce: yup.string().required('Zorunlu alan.'),
	adOrjinal: yup.string().required('Zorunlu alan.'),
	adIngilizce: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const cityValidate = yup.object().shape({
	adTurkce: yup.string().required('Zorunlu alan.'),
	adOrjinal: yup.string().required('Zorunlu alan.'),
	adIngilizce: yup.string().required('Zorunlu alan.'),
	ulkeId: yup.number().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const districtValidate = yup.object().shape({
	adTurkce: yup.string().required('Zorunlu alan.'),
	adOrjinal: yup.string().required('Zorunlu alan.'),
	adIngilizce: yup.string().required('Zorunlu alan.'),
	sehirId: yup.number().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const UnitTypeValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const DeliveryTypeValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const ProductPropertyValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const ProductPropertyValueValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
	nitelikId: yup.number().required('Zorunlu alan.'),
});

export const PublicCategoryValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
});

export const ChildrenCategoryValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
	anaKategoriId: yup.number().required('Zorunlu alan.'),
});

export const CategoryValidate = yup.object().shape({
	ad: yup.string().required('Zorunlu alan.'),
	aciklama: yup.string(),
	altKategoriId: yup.number().required('Zorunlu alan.'),
});

///

export const newProductValide = yup.object().shape({
	UrunAdi: yup.string().required('Zorunlu alan.'),
	KisaAdi: yup.string(),
	GTip: yup.string(),
	aciklama: yup.string(),
	GenelKategoriId: yup.number().required('Zorunlu alan.'),
	AltKategoriId: yup.number().required('Zorunlu alan.'),
	FlyKategoriId: yup.number().required('Zorunlu alan.'),
	TeknikOzellikDegerleri: yup.array().required('Zorunlu alan'),
});
