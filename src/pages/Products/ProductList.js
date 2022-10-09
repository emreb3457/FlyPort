import { Box, Button, Input } from '@chakra-ui/react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ListTable from '../../components/Talepler/ProductListTable/ListTable';
import useSWR from 'swr';
import BasicModal from '../../helpers/Modal';
import SkeletonComp from '../../components/Skeleton/Skeleton';
import { useModalStatus } from '../../hooks/useModalStatus';
import { TextInput } from '../../components/Inputs/CustomInputs';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { countryValidate } from '../../utils/validation';
import { sendRequest } from '../../utils/helpers';
import {
	getTalepInsert,
	getTalepList,
	getTalepRemove,
	getTalepUpdate,
} from '../../api/talepApi';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { getProductList } from '../../api/api';

const ProductList = () => {
	const navigate = useNavigate();
	const { clickFunct, isClick } = useModalStatus();
	const [page, setPage] = useState(0);
	const [radioValue, setRadioValue] = React.useState({});
	const [submitType, setSubmitType] = React.useState('');

	const { data, mutate, error } = useSWR(['_', page], getProductList);

	const {
		errors,
		handleChange,
		handleSubmit,
		values,
		touched,
		setValues,
	} = useFormik({
		initialValues: {
			aciklama: '',
		},
		onSubmit: (values, { resetForm }) => {
			submitType === 'create'
				? newProductSubmit({ values, mutate })
				: updateProductSubmit({
						values,
						mutate,
						id: JSON.parse(radioValue).id,
				  });

			resetForm();
			document
				.getElementsByClassName('chakra-modal__close-btn')[0]
				.click();
		},
		validationSchema: countryValidate,
	});

	const loading = !error && !data;
	const Head = [
		'#',
		'ID',
		'Ürün Tam Adı',
		'Kısa Adı',
		'Kategori',
		'İşlevi',
		'Özellik',
		'Özellik',
		'Özellik',
		'GTip No',
		'Kayıtlı Üretici',
		'Sipariş Sayısı',
	];
	const DataHead = [
		'id',
		'urunTamAd',
		'urunKisaAd',
		'kategori',
		'boş',
		'ozellik1',	
		'ozellik2',
		'ozellik3',		
		'gtipNo',
	];

	const newProductSubmit = async ({ values, mutate }) => {
		const { status } = await sendRequest(
			getTalepInsert('', {
				...values,
			})
		);
		status && mutate();
	};

	const updateProductSubmit = async ({ values, mutate, id }) => {
		const { status } = await sendRequest(
			getTalepUpdate('', {
				id,
				...values,
			})
		);
		status && mutate();
	};

	const removeProduct = async ({ radioValue, mutate }) => {
		const { status } = await sendRequest(
			getTalepRemove('_', JSON.parse(radioValue).id)
		);
		status && mutate();
	};

	return loading ? (
		<SkeletonComp />
	) : (
		<Box>
			<BreadCrumb
				funct1={{
					title: 'Yeni Ekle',
					function: () => {
						navigate(routes.yeniurun);
					},
				}}
				funct2={{
					title: 'Düzenle',
					function: () => {
						setSubmitType('update');
						const radiovalue = JSON.parse(radioValue);
						setValues({
							...radioValue,
						});
						clickFunct();
					},
				}}
				funct3={{
					title: 'Sil',
					function: () => {
						setSubmitType('delete');
						removeProduct({ radioValue, mutate });
					},
				}}
			>
				Ürünler
			</BreadCrumb>
			<Box
				mt="20px"
				px={'38px'}
			>
				<ListTable
					head={Head}
					dataHead={DataHead}
					row={data?.data}
					page={page}
					totalRowCount={data?.totalRowCount}
					changePage={setPage}
					radioValue={radioValue}
					radioSetValue={setRadioValue}
					link={true}
					select={true}
				/>
			</Box>
			{/* <BasicModal
				click={isClick}
				title={'Yeni Ürün'}
				formik={{ handleChange, handleSubmit, values }}
				component={NewProductComp({ handleChange, values, handleSubmit })}
			/> */}
		</Box>
	);
};
export default React.memo(ProductList);
