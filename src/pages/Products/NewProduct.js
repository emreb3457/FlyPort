import { Box, Select, Text } from '@chakra-ui/react';
import { Form, useFormik } from 'formik';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import {
	TextInput,
	SelectInput,
} from '../../components/Inputs/CustomInputs';
import { sendRequest } from '../../utils/helpers';
import { newProductValide } from '../../utils/validation';
import { getProductInsert, getProductList } from '../../api/api';
import useSWR from 'swr';
import {
	getPublicCategoryList,
	getChildrenCategoryList,
	getCategoryList,
	getProductPropertyList,
	getProductPropertyValueList,
} from '../../api/DefinitionsApi';
import { useState } from 'react';

const arrayParse = (data) => {
	const array = [];
	data?.map((x) => array.push(JSON.parse(x)));
	return array;
};

const arrayStringify = (data) => {
	const array = [];
	data?.map((x) => array.push(JSON.stringify(x)));
	return array;
};

const selectNitelikDeger = (...props) => {
	return function (obj) {
		console.log(obj);
		let newObj = Number;
		props.forEach((name) => {
			newObj = obj[name];
		});

		return newObj;
	};
};
const NewDemand = () => {
	const [deger, setDeger] = useState([]);

	const { data: ChildrenCategory, error } = useSWR(
		['getChildrenCategoryList'],
		getChildrenCategoryList
	);

	const { data: PublicCategory } = useSWR(
		['getPublicCategoryList'],
		getPublicCategoryList
	);

	const { data: Category } = useSWR(['getCategoryList'], getCategoryList);

	const { data: ProductProperty } = useSWR(
		['getProductPropertyList'],
		getProductPropertyList
	);

	const { data: ProductPropertyValue } = useSWR(
		['getProductPropertyValueList'],
		getProductPropertyValueList
	);
	const {
		errors,
		handleChange,
		handleSubmit,
		values,
		touched,
		setValues,
		setFieldValue,
	} = useFormik({
		initialValues: {
			UrunAdi: '',
			KisaAdi: '',
			GTip: '',
			GenelKategoriId: '',
			AltKategoriId: '',
			FlyKategoriId: '',
			TeknikOzellikDegerleri: [],
			UrunResimleri: '',
			aciklama: '',
		},
		onSubmit: (values, { resetForm }) => {
			newProductSubmit({ values });
		},
	});
	console.log(values);

	const newProductSubmit = async ({ values }) => {
		setFieldValue(
			'TeknikOzellikDegerleri',
			arrayParse(deger).map(selectNitelikDeger('nitelikDeger'))
		);
		console.log(values);
		const formData = new FormData();
		formData.append('UrunAdi', values.UrunAdi);
		formData.append('KisaAdi', values.KisaAdi);
		formData.append('GTip', values.GTip);
		formData.append('GenelKategoriId', values.GenelKategoriId);
		formData.append('AltKategoriId', values.AltKategoriId);
		formData.append('FlyKategoriId', values.FlyKategoriId);
		formData.append(
			'TeknikOzellikDegerleri',
			values.TeknikOzellikDegerleri
		);
		formData.append('UrunResimleri', values.UrunResimleri);
		formData.append('aciklama', values.aciklama);
		const { status } = await sendRequest(
			getProductInsert('', { formData })
		);
		//istege bakılacak
	};
	return (
		<Box>
			<BreadCrumb>Yeni Ürün</BreadCrumb>
			<form onSubmit={handleSubmit}>
				<Box
					display={'flex'}
					mt="20px"
					px="50px"
				>
					<Box width={{ lg: '35%', '2xl': '30%' }}>
						<TextInput
							name={'UrunAdi'}
							value={values.UrunAdi}
							onChange={handleChange}
							error={touched.UrunAdi && errors.UrunAdi}
						>
							Ürün Adı
						</TextInput>
						<TextInput
							name={'KisaAdi'}
							value={values.KisaAdi}
							onChange={handleChange}
							error={touched.KisaAdi && errors.KisaAdi}
						>
							Kısa Adı
						</TextInput>
						<TextInput
							name={'GTip'}
							value={values.GTip}
							onChange={handleChange}
							error={touched.GTip && errors.GTip}
						>
							Gtip
						</TextInput>
						<SelectInput
							name={'GenelKategoriId'}
							value={values.GenelKategoriId}
							onChange={handleChange}
							data={PublicCategory?.data}
							visableValue={'ad'}
							error={touched.GenelKategoriId && errors.GenelKategoriId}
						>
							Genel Kategori
						</SelectInput>
						<SelectInput
							name={'AltKategoriId'}
							value={values.AltKategoriId}
							onChange={handleChange}
							data={ChildrenCategory?.data}
							visableValue={'ad'}
							error={touched.AltKategoriId && errors.AltKategoriId}
						>
							Alt Kategori
						</SelectInput>
						<SelectInput
							name={'FlyKategoriId'}
							value={values.FlyKategoriId}
							onChange={handleChange}
							data={Category?.data}
							visableValue={'ad'}
							error={touched.FlyKategoriId && errors.FlyKategoriId}
						>
							Fly Kategori
						</SelectInput>
					</Box>
					<Box
						width={{ lg: '35%', '2xl': '30%' }}
						ml="17px"
					>
						{arrayParse(deger)?.map((data, index) => {
							const parseData = data;
							return (
								<Box
									key={index}
									display={'flex'}
								>
									<TextInput
										disabled={true}
										mr="10px"
										value={parseData.ad}
									>
										Teknik Özellik 1
									</TextInput>
									<SelectInput
										onChange={(x) => {
											const newArray = arrayParse(deger);
											newArray[index] = {
												...newArray[index],
												nitelikDeger: Number(x.target.value),
											};
											setDeger(arrayStringify(newArray));
										}}
										data={ProductPropertyValue?.data.filter(
											(x) => x.nitelikId === parseData.id
										)}
										visableValue={'ad'}
									/>
								</Box>
							);
						})}
						Ekle
						<Select
							onChange={(x) =>
								setDeger((prev) => [...prev, x.target.value])
							}
							h="54px"
							borderColor={'#D6D6D6'}
							value={''}
						>
							<option value={'default'}>Seçiniz</option>
							{ProductProperty?.data?.map((x) => {
								return (
									<option
										key={x.id}
										value={JSON.stringify(x)}
									>
										{x.ad}
									</option>
								);
							})}
						</Select>
					</Box>
				</Box>
				<Box mt="40px">
					<Text fontSize={'22px'}>Açıklama</Text>
					<Box
						maxW="1000px"
						w="100%"
						h="444px"
						border={'1px solid #9B9696'}
						borderRadius="21px"
						mt="10px"
					>
						<Text></Text>
					</Box>
				</Box>
				<button type="submit">asd</button>
			</form>
		</Box>
	);
};

export default NewDemand;
