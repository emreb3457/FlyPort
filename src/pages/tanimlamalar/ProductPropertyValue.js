import { Box, Button, Input } from '@chakra-ui/react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ListTable from '../../components/Talepler/ProductListTable/ListTable';
import useSWR from 'swr';
import {
	getProductPropertyList,
	getProductPropertyValueInsert,
	getProductPropertyValueList,
	getProductPropertyValueRemove,
	getProductPropertyValueUpdate,
} from '../../api/DefinitionsApi';
import BasicModal from '../../helpers/Modal';
import SkeletonComp from '../../components/Skeleton/Skeleton';
import { useModalStatus } from '../../hooks/useModalStatus';
import {
	SelectInput,
	TextInput,
} from '../../components/Inputs/CustomInputs';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ProductPropertyValueValidate } from '../../utils/validation';
import { sendRequest } from '../../utils/helpers';

const ProductPropertyValue = () => {
	const { clickFunct, isClick } = useModalStatus();
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(999);
	const [radioValue, setRadioValue] = React.useState({});
	const [submitType, setSubmitType] = React.useState('');

	const { data, mutate, error } = useSWR(
		['getProductPropertyValue', page],
		getProductPropertyValueList
	);

	const { data: ProductProperty } = useSWR(
		['getProductProperty', page,limit],
		getProductPropertyList
	);

	const {
		errors,
		handleChange,
		handleSubmit,
		values,
		touched,
		setValues,
	} = useFormik({
		initialValues: {
			ad: '',
			aciklama: '',
			nitelikId: '',
		},
		onSubmit: (values, { resetForm }) => {
			submitType === 'create'
				? newProductPropertyValueSubmit({ values, mutate })
				: updateProductPropertyValueSubmit({
						values,
						mutate,
						id: JSON.parse(radioValue).id,
				  });

			resetForm();
			document
				.getElementsByClassName('chakra-modal__close-btn')[0]
				.click();
		},
		validationSchema: ProductPropertyValueValidate,
	});

	const loading = !error && !data;

	const Head = ['#', 'ID', 'Ad ', 'Nitelik', 'Açıklama'];
	const DataHead = ['id', 'ad', 'nitelikAd', 'aciklama'];

	const newProductPropertyValueSubmit = async ({ values, mutate }) => {
		const { status } = await sendRequest(
			getProductPropertyValueInsert('', {
				...values,
			})
		);
		status && mutate();
	};

	const updateProductPropertyValueSubmit = async ({
		values,
		mutate,
		id,
	}) => {
		const { status } = await sendRequest(
			getProductPropertyValueUpdate('', {
				id,
				...values,
			})
		);
		status && mutate();
	};

	const removeProductPropertyValue = async ({ radioValue, mutate }) => {
		const { status } = await sendRequest(
			getProductPropertyValueRemove('_', JSON.parse(radioValue).id)
		);
		status && mutate();
	};

	const NewProductPropertyValueComp = ({
		handleChange,
		values,
		handleSubmit,
		data,
	}) => {
		return (
			<form
				onSubmit={handleSubmit}
				style={{ padding: '10px 0' }}
			>
				<TextInput
					name={'ad'}
					value={values.ad}
					onChange={handleChange}
					error={touched?.ad && errors.ad}
				>
					Ad
				</TextInput>
				<TextInput
					name={'aciklama'}
					value={values.aciklama}
					onChange={handleChange}
					error={touched?.aciklama && errors.aciklama}
				>
					Acıklama
				</TextInput>
				<SelectInput
					name={'nitelikId'}
					value={values.nitelikId}
					onChange={handleChange}
					data={data}
					visableValue={'ad'}
					error={touched.nitelikId && errors.nitelikId}
				>
					Nitelik
				</SelectInput>
				<Button type="submit">Ekle</Button>
			</form>
		);
	};

	return loading ? (
		<SkeletonComp />
	) : (
		<Box>
			<BreadCrumb
				funct1={{
					title: 'Yeni Ekle',
					function: () => {
						setSubmitType('create');
						clickFunct();
					},
				}}
				funct2={{
					title: 'Düzenle',
					function: () => {
						setSubmitType('update');
						const radiovalue = JSON.parse(radioValue);
						setValues({
							...radiovalue,
						});
						clickFunct();
					},
				}}
				funct3={{
					title: 'Sil',
					function: () => {
						setSubmitType('delete');
						removeProductPropertyValue({ radioValue, mutate });
					},
				}}
			>
				Ülkeler
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
			<BasicModal
				click={isClick}
				title={'Yeni Ülke Ekle'}
				formik={{ handleChange, handleSubmit, values }}
				component={NewProductPropertyValueComp({
					handleChange,
					values,
					handleSubmit,
					data: ProductProperty?.data,
				})}
			/>
		</Box>
	);
};
export default React.memo(ProductPropertyValue);
