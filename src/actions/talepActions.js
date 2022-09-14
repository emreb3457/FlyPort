import instance from "../utils/axios"
import {
    TALEP_LIST_SUCCESS,
    TALEP_ERROR,
    TALEP_REQUEST,
    TALEP_GET_SUCCESS,
    TALEPURUN_LIST_SUCCESS,
    TALEPURUN_GET_SUCCESS,
    TALEPURUN_INSERT_SUCCESS,
    TALEPURUN_UPDATE_SUCCESS,
    TALEPURUN_REMOVE_SUCCESS
} from "../constants/talepContants"
import { errorMessageWrite } from "../utils/errorMessageWrite";


export const getTalepList = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/Talep/List", {});
        dispatch({
            type: TALEP_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
};

export const getTalep = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/Talep/Get", {});
        dispatch({
            type: TALEP_GET_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
}

export const getTalepUrunList = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/TalepUrun/List", {});
        dispatch({
            type: TALEPURUN_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
}

export const getTalepUrun = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/Talep/Get", {});
        dispatch({
            type: TALEPURUN_GET_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
}

export const getTalepUrunInsert = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/Talep/Insert", {});
        dispatch({
            type: TALEPURUN_INSERT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
}

export const getTalepUrunUpdate = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/Talep/Update", {});
        dispatch({
            type: TALEPURUN_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
}

export const getTalepUrunRemove = () => async (dispatch) => {
    try {
        dispatch({ type: TALEP_REQUEST });
        const { data } = await instance.post("/Talep/Remove", {});
        dispatch({
            type: TALEPURUN_REMOVE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TALEP_ERROR,
            payload: errorMessageWrite(error)
        })

    }
}