import instance from '../utils/axios';

export const getProductList = async () => {
	return await instance
		.get('/Urun/BirlesmisListele')
		.then((res) => res.data);
};

export const getProduct = async (_, id) => {
	return await instance.get('/Urun/Bul/' + id).then((res) => res.data);
};

export const getProductInsert = async (_, body) => {
	console.log(body);
	return await instance
		.post('/Urun/SayfaKaydet', body, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		.then((res) => res.data);
};

export const getProductUpdate = async (_, body) => {
	return await instance
		.post('/Urun/Guncelle', body)
		.then((res) => res.data);
};

export const getProductRemove = async (_, id) => {
	return await instance.get('/Urun/Sil?id=' + id).then((res) => res.data);
};
