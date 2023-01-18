export const errorMessageWrite = (error) => {
  console.log(error);
  let errorMessage = error?.response?.data
    ? error?.response.data?.msg
    : "Error" || error;
  return errorMessage;
};
