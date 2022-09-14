import {
    TALEP_LIST_SUCCESS,
    TALEP_ERROR,
    TALEP_REQUEST,
    TALEP_GET_SUCCESS
} from "../constants/talepContants"

const initialState = {
    loading: false,
}
export const talepReducer = (state = initialState, action) => {
    switch (action.type) {
        case TALEP_REQUEST:
            return {
                loading: true
            }

        case TALEP_LIST_SUCCESS:
            return {
                loading: false,
                talepList: action.payload
            }
        case TALEP_GET_SUCCESS:
            return {
                loading: false,
                talep: action.payload
            }
        case TALEP_ERROR:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        default:
            return state;
    }
}