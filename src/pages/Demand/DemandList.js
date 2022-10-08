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

const DemandList = () => {
	const navigate = useNavigate();
	const { clickFunct, isClick } = useModalStatus();
	const [page, setPage] = useState(0);
	const [radioValue, setRadioValue] = React.useState({});
	const [submitType, setSubmitType] = React.useState('');

	const { data, mutate, error } = useSWR(['_', page], getTalepList);

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
				? newDemandSubmit({ values, mutate })
				: updateDemandSubmit({
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
		'Tarih',
		'Müşteri',
		'Ürün',
		'Teknik Özellik',
		'İstenen Miktar',
		'Üretici Ülkesi',
		'Varış Ülkesi',
		'Sorumlu',
		'Kalan Süre',
	];
	const DataHead = ['id', 'adOrjinal', 'adTurkce', 'adIngilizce'];

	const newDemandSubmit = async ({ values, mutate }) => {
		const { status } = await sendRequest(
			getTalepInsert('', {
				aciklama: values.aciklama,
				adOrjinal: values.adOrjinal,
				adTurkce: values.adTurkce,
				adIngilizce: values.adIng,
			})
		);
		status && mutate();
	};

	const updateDemandSubmit = async ({ values, mutate, id }) => {
		const { status } = await sendRequest(
			getTalepUpdate('', {
				id,
				aciklama: values.aciklama,
				adOrjinal: values.adOrjinal,
				adTurkce: values.adTurkce,
				adIngilizce: values.adIng,
			})
		);
		status && mutate();
	};

	const removeDemand = async ({ radioValue, mutate }) => {
		const { status } = await sendRequest(
			getTalepRemove('_', JSON.parse(radioValue).id)
		);
		status && mutate();
	};

	const NewDemandComp = ({ handleChange, values, handleSubmit }) => {
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
						navigate(routes.yenitalep);
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
						removeDemand({ radioValue, mutate });
					},
				}}
			>
				Talepler
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
				component={NewDemandComp({ handleChange, values, handleSubmit })}
			/>
		</Box>
	);
};
export default React.memo(DemandList);
