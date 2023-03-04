export const errorMessageWrite = (error) => {
  console.log(error);
  let errorMessage = error?.response?.data
    ? error?.response.data?.msg || error?.response.data?.title
    : "Error" || error;
  return errorMessage;
};
