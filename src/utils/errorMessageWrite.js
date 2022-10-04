export const errorMessageWrite = (error) => {
  let errorMessage = error?.response.data ? error?.response.data?.msg : "Error";
  return errorMessage;
};
