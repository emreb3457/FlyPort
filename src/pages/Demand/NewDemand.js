import { Box, Text } from '@chakra-ui/react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import {
	TextInput,
	SelectInput,
} from '../../components/Inputs/CustomInputs';

const NewDemand = () => {
	return (
		<Box>
			<BreadCrumb>Yeni Talep</BreadCrumb>
			<Box
				display={'flex'}
				mt="20px"
				px="50px"
			>
				<Box width={{ lg: '35%', '2xl': '30%' }}>
					<TextInput>İstenen</TextInput>
					<TextInput>Ürün Adı</TextInput>
					<SelectInput>Nereden</SelectInput>
					<SelectInput>Nereye</SelectInput>
					<SelectInput>Teslimat Şekli</SelectInput>
					<TextInput>İstenen Miktar</TextInput>
				</Box>
				<Box
					width={{ lg: '35%', '2xl': '30%' }}
					ml="17px"
				>
					<SelectInput>Kategori</SelectInput>
					<SelectInput>Teknik Özellik 1</SelectInput>
					<SelectInput>Teknik Özellik 2</SelectInput>
					<SelectInput>Teknik Özellik 3</SelectInput>
					<SelectInput>Teknik Özellik 4</SelectInput>
					<SelectInput>Yeni Ekle</SelectInput>
				</Box>
				<Box
					width={{ lg: '35%', '2xl': '30%' }}
					ml="3px"
				>
					<TextInput> </TextInput>
					<TextInput> </TextInput>
					<TextInput> </TextInput>
					<TextInput> </TextInput>
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
		</Box>
	);
};

export default NewDemand;
