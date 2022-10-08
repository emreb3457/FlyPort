import instance from '../utils/axios';

export const getTalepList = async () => {
	return await instance
		.get('/Talep/SayfaliListele')
		.then((res) => res.data);
};

export const getTalep = async (_, id) => {
	return await instance.get('/Talep/Bul/' + id).then((res) => res.data);
};

export const getTalepInsert = async (_, body) => {
	return await instance.post('/Talep/Ekle', body).then((res) => res.data);
};

export const getTalepUpdate = async (_, body) => {
	return await instance
		.post('/Talep/Guncelle', body)
		.then((res) => res.data);
};

export const getTalepRemove = async (_, id) => {
	return await instance.get('/Talep/Sil?id=' + id).then((res) => res.data);
};



export const getTalepUrunList = () => async (dispatch) => {
	try {
		const { data } = await instance.post('/TalepUrun/List', {});
	} catch (error) {}
};

export const getTalepUrun = () => async (dispatch) => {
	try {
		const { data } = await instance.post('/Talep/Get', {});
	} catch (error) {}
};

export const getTalepUrunInsert = () => async (dispatch) => {
	try {
		const { data } = await instance.post('/Talep/Insert', {});
	} catch (error) {}
};

export const getTalepUrunUpdate = () => async (dispatch) => {
	try {
		const { data } = await instance.post('/Talep/Update', {});
	} catch (error) {}
};

export const getTalepUrunRemove = () => async (dispatch) => {
	try {
		const { data } = await instance.post('/Talep/Remove', {});
	} catch (error) {}
};
