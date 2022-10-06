import { Box, Text, Input, Select } from '@chakra-ui/react';

export const TextInput = ({
	name,
	value,
	label,
	children,
	bg,
	disabled = false,
	onChange,
	error,
	...props
}) => {
	return (
		<Box
			py="10px"
			fontSize={'18px'}
			w="100%"
			{...props}
		>
			<Text
				mr="5px"
				color={'#232F3D'}
			>
				{children ? children : ' '}
			</Text>
			<Input
				h="54px"
				name={name}
				value={value}
				onChange={onChange}
				borderColor={'#D6D6D6'}
				disabled={disabled}
				bg={disabled ? '#D6D6D6' : bg}
			/>
			{error && (
				<Text
					mr="5px"
					color={'red'}
					fontSize="12px"
				>
					{error}
				</Text>
			)}
		</Box>
	);
};

export const SelectInput = ({
	name,
	value,
	label,
	children,
	bg,
	disabled = false,
	onChange,
	data,
	visableValue,
	error,
	...props
}) => {
	return (
		<Box
			py="10px"
			fontSize={'18px'}
			w="100%"
			{...props}
		>
			<Text
				mr="5px"
				color={'#232F3D'}
			>
				{children ? children : ' '}
			</Text>
			<Select
				name={name}
				onChange={onChange}
				data={data}
				h="54px"
				borderColor={'#D6D6D6'}
				bg={bg}
				defaultValue={value}
			>
				<option value={'default'}>Seçiniz</option>
				{data?.map((x) => {
					return (
						<option
							key={x.id}
							value={x?.id}
						>
							{x[visableValue]}
						</option>
					);
				})}
			</Select>
		</Box>
	);
};
