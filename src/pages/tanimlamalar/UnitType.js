import { Box, Button, Input } from '@chakra-ui/react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ListTable from '../../components/Talepler/ProductListTable/ListTable';
import useSWR from 'swr';
import {
	getUnitTypeInsert,
	getUnitTypeRemove,
	getUnitTypeUpdate,
	getUnitTypeList,
} from '../../api/DefinitionsApi';
import BasicModal from '../../helpers/Modal';
import SkeletonComp from '../../components/Skeleton/Skeleton';
import { useModalStatus } from '../../hooks/useModalStatus';
import { TextInput } from '../../components/Inputs/CustomInputs';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { UnitTypeValidate } from '../../utils/validation';
import { sendRequest } from '../../utils/helpers';

const UnitType = () => {
	const { clickFunct, isClick } = useModalStatus();
	const [page, setPage] = useState(0);
	const [radioValue, setRadioValue] = React.useState({});
	const [submitType, setSubmitType] = React.useState('');

	const { data, mutate, error } = useSWR(['_', page], getUnitTypeList);

	const { errors, handleChange, handleSubmit, values, setValues } =
		useFormik({
			initialValues: {
				ad: '',
				aciklama: '',
			},
			onSubmit: (values, { resetForm }) => {
				submitType === 'create'
					? newCountrySubmit({ values, mutate, errors, setValues })
					: updateCountrySubmit({
							values,
							mutate,
							errors,
							setValues,
							id: JSON.parse(radioValue).id,
					  });
				resetForm();
			},
			validationSchema: UnitTypeValidate,
		});

	const loading = !error && !data;

	const Head = ['#', 'ID', 'Ad', 'Açıklama'];
	const DataHead = ['id', 'ad', 'aciklama'];

	const newCountrySubmit = async ({
		values,
		mutate,
		errors,
		setValues,
	}) => {
		const { status } = await sendRequest(
			getUnitTypeInsert('', {
				aciklama: values.aciklama,
				ad: values.ad,
			}),
			{
				errors,
				setValues,
			}
		);
		status && mutate();
	};

	const updateCountrySubmit = async ({
		values,
		mutate,
		errors,
		setValues,
		id,
	}) => {
		const { status } = await sendRequest(
			getUnitTypeUpdate('', {
				id,
				aciklama: values.aciklama,
				adOrjinal: values.adOrjinal,
				adTurkce: values.adTurkce,
				adIngilizce: values.adIng,
			}),
			{
				errors,
				setValues,
			}
		);
		status && mutate();
	};

	const removeCountry = async ({ radioValue, mutate }) => {
		const { status } = await sendRequest(
			getUnitTypeRemove('_', JSON.parse(radioValue).id)
		);
		status && mutate();
	};

	const NewCountryComp = ({
		submitType,
		handleChange,
		values,
		handleSubmit,
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
				>
					Ad
				</TextInput>
				<TextInput
					name={'aciklama'}
					value={values.aciklama}
					onChange={handleChange}
				>
					Acıklama
				</TextInput>
				<Button
					type="submit"
					onClick={() =>
						document
							.getElementsByClassName('chakra-modal__close-btn')[0]
							.click()
					}
				>
					Ekle
				</Button>
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
							adTurkce: radiovalue.adTurkce,
							adIng: radiovalue.adIngilizce,
							adOrjinal: radiovalue.adOrjinal,
							aciklama: radiovalue.aciklama,
						});
						clickFunct();
					},
				}}
				funct3={{
					title: 'Sil',
					function: () => {
						setSubmitType('delete');
						removeCountry({ radioValue, mutate });
					},
				}}
			>
				Ülkelere Göre Maliyetleri
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
					totalRowCount={data.totalRowCount}
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
				component={NewCountryComp({ handleChange, values, handleSubmit })}
			/>
		</Box>
	);
};
export default React.memo(UnitType);
