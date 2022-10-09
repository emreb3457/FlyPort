import { Box, Button, Input } from '@chakra-ui/react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ListTable from '../../components/Talepler/ProductListTable/ListTable';
import useSWR from 'swr';
import {
	getChildrenCategoryInsert,
	getChildrenCategoryList,
	getChildrenCategoryRemove,
	getChildrenCategoryUpdate,
	getPublicCategoryList,
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
import { ChildrenCategoryValidate } from '../../utils/validation';
import { sendRequest } from '../../utils/helpers';

const ChildrenCategory = () => {
	const { clickFunct, isClick } = useModalStatus();
	const [page, setPage] = useState(0);
	const [radioValue, setRadioValue] = React.useState({});
	const [submitType, setSubmitType] = React.useState('');

	const { data, mutate, error } = useSWR(
		['getChildrenCategory', page],
		getChildrenCategoryList
	);

	const { data: PublicCategory } = useSWR(
		['getPublicCategoryList', page],
		getPublicCategoryList
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
			anaKategoriId: '',
		},
		onSubmit: (values, { resetForm }) => {
			submitType === 'create'
				? newChildrenCategorySubmit({ values, mutate })
				: updateChildrenCategorySubmit({
						values,
						mutate,
						id: JSON.parse(radioValue).id,
				  });

			resetForm();
			document
				.getElementsByClassName('chakra-modal__close-btn')[0]
				.click();
		},
		validationSchema: ChildrenCategoryValidate,
	});

	const loading = !error && !data;

	const Head = ['#', 'ID', 'Ad ', 'Genel Kategori', 'Açıklama'];
	const DataHead = ['id', 'ad', 'anaKategoriAd', 'aciklama'];

	const newChildrenCategorySubmit = async ({ values, mutate }) => {
		const { status } = await sendRequest(
			getChildrenCategoryInsert('', {
				...values,
			})
		);
		status && mutate();
	};

	const updateChildrenCategorySubmit = async ({ values, mutate, id }) => {
		const { status } = await sendRequest(
			getChildrenCategoryUpdate('', {
				id,
				...values,
			})
		);
		status && mutate();
	};

	const removeChildrenCategory = async ({ radioValue, mutate }) => {
		const { status } = await sendRequest(
			getChildrenCategoryRemove('_', JSON.parse(radioValue).id)
		);
		status && mutate();
	};

	const NewChildrenCategoryComp = ({
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
					name={'anaKategoriId'}
					value={values.anaKategoriId}
					onChange={handleChange}
					data={data}
					visableValue={'ad'}
					error={touched.anaKategoriId && errors.anaKategoriId}
				>
					Ana Kategori
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
						removeChildrenCategory({ radioValue, mutate });
					},
				}}
			>
				Alt Kategori
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
				title={'Yeni Alt Kategori'}
				formik={{ handleChange, handleSubmit, values }}
				component={NewChildrenCategoryComp({
					handleChange,
					values,
					handleSubmit,
					data: PublicCategory?.data,
				})}
			/>
		</Box>
	);
};
export default React.memo(ChildrenCategory);
