import { Box, Img } from '@chakra-ui/react';
import { useState } from 'react';

const ImageComp = ({ images, ...props }) => {
	const [active, setActive] = useState();
	const isImages = images?.length ? true : false;
	console.log(isImages)
	return (
		<Box
			maxW="390px"
			mt="30px"
			{...props}
		>
			<Img
				src={
					(isImages && images[0]) ||
					'https://i2.wp.com/planx.co.il/wp-content/uploads/2011/05/400x400.png?fit=400%2C400&ssl=1'
				}
				w="390px"
				h="218px"
				borderRadius={21}
			/>
			<Box
				display={'flex'}
				justifyContent="space-between"
				mt="7px"
			>
				<Img
					src={
						(isImages && images[1]) ||
						'https://i2.wp.com/planx.co.il/wp-content/uploads/2011/05/400x400.png?fit=400%2C400&ssl=1'
					}
					alt="image"
					w="114px"
					h="68"
					borderRadius={21}
				/>
				<Img
					src={
						(isImages && images[2]) ||
						'https://i2.wp.com/planx.co.il/wp-content/uploads/2011/05/400x400.png?fit=400%2C400&ssl=1'
					}
					alt="image"
					w="114px"
					h="68"
					borderRadius={21}
				/>
				<Img
					src={
						(isImages && images[3]) ||
						'https://i2.wp.com/planx.co.il/wp-content/uploads/2011/05/400x400.png?fit=400%2C400&ssl=1'
					}
					alt="image"
					w="114px"
					h="68"
					borderRadius={21}
				/>
			</Box>
		</Box>
	);
};
export default ImageComp;
