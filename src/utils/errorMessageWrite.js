
export const errorMessageWrite = (error) => {
    let errorMessage = error?.response.data ? JSON.parse(error?.response.data?.message).error_description : error.response.statusText
    return errorMessage;
}