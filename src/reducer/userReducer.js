import {

    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../constants/userConstants"

const initialState = {
    loading: false,
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case "CLEAR_ERROR":
            return {
                error: null
            }
        case "CLEAR_SUCCESS":
            return {
                success: null
            }
        default:
            return state;
    }
}