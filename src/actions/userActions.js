import instance from "../utils/axios"
import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../constants/userConstants.js"
import { errorMessageWrite } from "../utils/errorMessageWrite";


export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        let customConfig = {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
            }
        };

        dispatch({ type: LOGIN_REQUEST })

        const { data } = await instance.post("/Auth/GetToken", { email, password }, customConfig);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        // sessionStorage.setItem('accessToken', data);
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: errorMessageWrite(error)
        })
        
    }
}