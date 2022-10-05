import instance from "../utils/axios";
import { errorMessageWrite } from "../utils/errorMessageWrite";

export const getTalepList = async () => {
  return await instance
    .get("/TalepUrun/BirlesmisListele")
    .then((res) => res.data);
};

export const getTalep = () => async (dispatch) => {
  try {
    const { data } = await instance.post("/Talep/Get", {});
  } catch (error) {}
};

export const getTalepUrunList = () => async (dispatch) => {
  try {
    const { data } = await instance.post("/TalepUrun/List", {});
  } catch (error) {}
};

export const getTalepUrun = () => async (dispatch) => {
  try {
    const { data } = await instance.post("/Talep/Get", {});
  } catch (error) {}
};

export const getTalepUrunInsert = () => async (dispatch) => {
  try {
    const { data } = await instance.post("/Talep/Insert", {});
  } catch (error) {}
};

export const getTalepUrunUpdate = () => async (dispatch) => {
  try {
    const { data } = await instance.post("/Talep/Update", {});
  } catch (error) {}
};

export const getTalepUrunRemove = () => async (dispatch) => {
  try {
    const { data } = await instance.post("/Talep/Remove", {});
  } catch (error) {}
};
