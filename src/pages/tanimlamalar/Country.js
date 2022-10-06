import { Box, Button, Input } from '@chakra-ui/react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ListTable from '../../components/Talepler/ProductListTable/ListTable';
import useSWR from 'swr';
import {
	getCountryInsert,
	getCountryList,
	getCountryRemove,
	getCountryUpdate,
} from '../../api/DefinitionsApi';
import BasicModal from '../../helpers/Modal';
import SkeletonComp from '../../components/Skeleton/Skeleton';
import { useModalStatus } from '../../hooks/useModalStatus';
import { TextInput } from '../../components/Inputs/CustomInputs';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { countryValidate } from '../../utils/validation';
import { sendRequest } from '../../utils/helpers';

const CountryList = () => {
	const { clickFunct, isClick } = useModalStatus();
	const [page, setPage] = useState(0);
	const [radioValue, setRadioValue] = React.useState({});
	const [submitType, setSubmitType] = React.useState('');

	const { data, mutate, error } = useSWR(['_', page], getCountryList);

	const {
		errors,
		handleChange,
		handleSubmit,
		values,
		touched,
		setValues,
	} = useFormik({
		initialValues: {
			adTurkce: '',
			adOrjinal: '',
			adIng: '',
			aciklama: '',
		},
		onSubmit: (values, { resetForm }) => {
			submitType === 'create'
				? newCountrySubmit({ values, mutate })
				: updateCountrySubmit({
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

	const Head = ['#', 'ID', 'Ad Orjinal', 'Ad Türkçe', 'Ad Ingilizce'];
	const DataHead = ['id', 'adOrjinal', 'adTurkce', 'adIngilizce'];

	const newCountrySubmit = async ({ values, mutate }) => {
		const { status } = await sendRequest(
			getCountryInsert('', {
				aciklama: values.aciklama,
				adOrjinal: values.adOrjinal,
				adTurkce: values.adTurkce,
				adIngilizce: values.adIng,
			})
		);
		status && mutate();
	};

	const updateCountrySubmit = async ({ values, mutate, id }) => {
		const { status } = await sendRequest(
			getCountryUpdate('', {
				id,
				aciklama: values.aciklama,
				adOrjinal: values.adOrjinal,
				adTurkce: values.adTurkce,
				adIngilizce: values.adIng,
			})
		);
		status && mutate();
	};

	const removeCountry = async ({ radioValue, mutate }) => {
		const { status } = await sendRequest(
			getCountryRemove('_', JSON.parse(radioValue).id)
		);
		status && mutate();
	};

	const NewCountryComp = ({ handleChange, values, handleSubmit }) => {
		return (
			<form
				onSubmit={handleSubmit}
				style={{ padding: '10px 0' }}
			>
				<TextInput
					name={'adOrjinal'}
					value={values.adOrjinal}
					onChange={handleChange}
					error={touched?.adOrjinal && errors.adOrjinal}
				>
					Orjinal Ad
				</TextInput>
				<TextInput
					name={'adTurkce'}
					value={values.adTurkce}
					onChange={handleChange}
					error={touched?.adTurkce && errors.adTurkce}
				>
					Türkçe Ad
				</TextInput>
				<TextInput
					name={'adIng'}
					value={values.adIng}
					onChange={handleChange}
					error={touched?.adIng && errors.adIng}
				>
					Ingilizce Ad
				</TextInput>
				<TextInput
					name={'aciklama'}
					value={values.aciklama}
					onChange={handleChange}
					error={touched?.aciklama && errors.aciklama}
				>
					Acıklama
				</TextInput>
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
export default React.memo(CountryList);
