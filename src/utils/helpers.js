import { toast } from 'react-toastify';
import { errorMessageWrite } from './errorMessageWrite';

export const getObjectLength = (object) => {
	return Object.keys(object).length;
};

export const sendRequest = async (api) => {
	return await api
		.then((response) => {
			toast(response?.message || 'Başarılı', {
				type: 'success',
			});
			return { status: true, response };
		})
		.catch((error) => {
			toast.error(errorMessageWrite(error));
			return { status: false };
		})
		.finally(() => {
			return { status: false };
		});
};

export const arrayParse = (data) => {
	const array = [];
	data?.map((x) => array.push(JSON.parse(x)));
	return array;
};

export const arrayStringify = (data) => {
	const array = [];
	data?.map((x) => array.push(JSON.stringify(x)));
	return array;
};
