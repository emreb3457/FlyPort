import instance from '../utils/axios';
import { errorMessageWrite } from '../utils/errorMessageWrite';

//Country Api - Start
export const getCountryList = async (_, page) => {
	return await instance
		.get('/Ulke/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getCountry = async (_, id) => {
	return await instance.get('/Ulke/Bul/' + id).then((res) => res.data);
};

export const getCountryInsert = async (_, body) => {
	return await instance.post('/Ulke/Ekle', body).then((res) => res.data);
};

export const getCountryUpdate = async (_, body) => {
	return await instance
		.post('/Ulke/Guncelle', body)
		.then((res) => res.data);
};

export const getCountryRemove = async (_, id) => {
	return await instance.get('/Ulke/Sil?id=' + id).then((res) => res.data);
};
//Country Api - End

//Unit Type Api - Start
export const getUnitTypeList = async (_, page) => {
	return await instance
		.get('/BirimTipi/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getUnitType = async (_, id) => {
	return await instance
		.get('/BirimTipi/Bul/' + id)
		.then((res) => res.data);
};

export const getUnitTypeInsert = async (_, body) => {
	return await instance
		.post('/BirimTipi/Ekle', body)
		.then((res) => res.data);
};

export const getUnitTypeUpdate = async (_, body) => {
	return await instance
		.post('/BirimTipi/Guncelle', body)
		.then((res) => res.data);
};

export const getUnitTypeRemove = async (_, id) => {
	return await instance
		.get('/BirimTipi/Sil?id=' + id)
		.then((res) => res.data);
};
//Unit Type Api - End

//City Api - Start
export const getCityList = async (_, page) => {
	return await instance
		.get('/Sehir/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getCity = async (_, id) => {
	return await instance.get('/Sehir/Bul/' + id).then((res) => res.data);
};

export const getCityInsert = async (_, body) => {
	return await instance.post('/Sehir/Ekle', body).then((res) => res.data);
};

export const getCityUpdate = async (_, body) => {
	return await instance
		.post('/Sehir/Guncelle', body)
		.then((res) => res.data);
};

export const getCityRemove = async (_, id) => {
	return await instance.get('/Sehir/Sil?id=' + id).then((res) => res.data);
};
//City Api - End

//District Api - Start
export const getDistrictList = async (_, page) => {
	return await instance
		.get('/Ilce/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getDistrict = async (_, id) => {
	return await instance.get('/Ilce/Bul/' + id).then((res) => res.data);
};

export const getDistrictInsert = async (_, body) => {
	return await instance.post('/Ilce/Ekle', body).then((res) => res.data);
};

export const getDistrictUpdate = async (_, body) => {
	return await instance
		.post('/Ilce/Guncelle', body)
		.then((res) => res.data);
};

export const getDistrictRemove = async (_, id) => {
	return await instance.get('/Ilce/Sil?id=' + id).then((res) => res.data);
};
//District Api - End

//Category Api - Start
export const geCategorytList = async (_, page) => {
	return await instance
		.get('/Ilce/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getCategory = async (_, id) => {
	return await instance.get('/Kategori/Bul/' + id).then((res) => res.data);
};

export const getCategoryInsert = async (_, body) => {
	return await instance
		.post('/Kategori/Ekle', body)
		.then((res) => res.data);
};

export const getCategoryUpdate = async (_, body) => {
	return await instance
		.post('/Kategori/Guncelle', body)
		.then((res) => res.data);
};

export const getCategoryRemove = async (_, id) => {
	return await instance
		.get('/Kategori/Sil?id=' + id)
		.then((res) => res.data);
};
//Category Api - End

//Certificate Api - Start
export const getCertificateList = async (_, page) => {
	return await instance
		.get('/Sertifika/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getCertificate = async (_, id) => {
	return await instance
		.get('/Sertifika/Bul/' + id)
		.then((res) => res.data);
};

export const getCertificateInsert = async (_, body) => {
	return await instance
		.post('/Sertifika/Ekle', body)
		.then((res) => res.data);
};

export const getCertificateUpdate = async (_, body) => {
	return await instance
		.post('/Sertifika/Guncelle', body)
		.then((res) => res.data);
};

export const getCertificateRemove = async (_, id) => {
	return await instance
		.get('/Sertifika/Sil?id=' + id)
		.then((res) => res.data);
};
//Certificate Api - End

//Transport Api - Start
export const getTransportTypeList = async (_, page) => {
	return await instance
		.get('/TasimaTipi/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getTransportType = async (_, id) => {
	return await instance
		.get('/TasimaTipi/Bul/' + id)
		.then((res) => res.data);
};

export const getTransportTypeInsert = async (_, body) => {
	return await instance
		.post('/TasimaTipi/Ekle', body)
		.then((res) => res.data);
};

export const getTransportTypeUpdate = async (_, body) => {
	return await instance
		.post('/TasimaTipi/Guncelle', body)
		.then((res) => res.data);
};

export const getTransportTypeRemove = async (_, id) => {
	return await instance
		.get('/TasimaTipi/Sil?id=' + id)
		.then((res) => res.data);
};
//Transport Api - End

//Delivery Api - Start
export const getDeliveryList = async (_, page) => {
	return await instance
		.get('/TeslimatTipi/SayfaliListele?page=' + page)
		.then((res) => res.data);
};

export const getDelivery = async (_, id) => {
	return await instance.get('/TeslimatTipi/Bul/' + id).then((res) => res.data);
};

export const getDeliveryInsert = async (_, body) => {
	return await instance.post('/TeslimatTipi/Ekle', body).then((res) => res.data);
};

export const getDeliveryUpdate = async (_, body) => {
	return await instance
		.post('/TeslimatTipi/Guncelle', body)
		.then((res) => res.data);
};

export const getDeliveryRemove = async (_, id) => {
	return await instance.get('/TeslimatTipi/Sil?id=' + id).then((res) => res.data);
};
//Country Api - End
